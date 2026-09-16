import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lead intake.
 *
 * Delivered via Telegram — see `deliverLead()`. `TELEGRAM_BOT_TOKEN` and
 * `TELEGRAM_CHAT_ID` (comma-separated for more than one recipient) live in
 * `.env.local`, never in source. No NEXT_PUBLIC_ prefix: these must stay
 * server-side only.
 *
 * A database is still worth adding before real volume arrives — Telegram is
 * fire-and-forget with no query-able history — but it is no longer true that
 * a lead vanishes if nobody reads the log, which was the actual risk
 * `15-emergency-user-behavior.md` flags an unanswered urgent enquiry against.
 */

/** Naive fixed-window limiter, keyed by IP. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;

  entry.count += 1;
  return true;
}

// Keep the map from growing without bound in a long-lived process.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of hits) if (now > entry.resetAt) hits.delete(key);
}, WINDOW_MS).unref?.();

/** HTML special characters Telegram's HTML parse mode requires escaped. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const INTENT_LABELS: Record<string, string> = {
  rent: "Rent",
  buy: "Buy",
  "not-sure": "Not sure yet",
};

function formatLeadMessage(lead: Record<string, unknown>): string {
  const name = escapeHtml(String(lead.name ?? ""));
  const phone = escapeHtml(String(lead.phone ?? ""));
  const city = escapeHtml(String(lead.city ?? ""));
  const equipment = escapeHtml(String(lead.equipment ?? ""));
  const intent = INTENT_LABELS[String(lead.intent)] ?? escapeHtml(String(lead.intent ?? ""));
  const message = lead.message ? escapeHtml(String(lead.message)) : null;

  const lines = [
    "🩺 <b>New enquiry — Encone Med</b>",
    "",
    `<b>Name:</b> ${name}`,
    `<b>Phone:</b> <a href="tel:${encodeURIComponent(phone)}">${phone}</a>`,
    `<b>City:</b> ${city}`,
    `<b>Equipment:</b> ${equipment}`,
    `<b>Wants to:</b> ${intent}`,
  ];
  if (message) lines.push(`<b>Message:</b> ${message}`);
  lines.push("", `<i>${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</i>`);

  return lines.join("\n");
}

/**
 * Sends the lead to every configured Telegram chat.
 *
 * A comma-separated `TELEGRAM_CHAT_ID` fans a single lead out to several
 * recipients — e.g. more than one person on call duty. Every recipient must
 * succeed or this throws, matching the route's existing "delivery failed"
 * error path; a lead that reached one phone but silently not another is
 * exactly the kind of partial failure worth surfacing rather than swallowing.
 */
async function deliverLead(lead: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIdsRaw = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatIdsRaw) {
    // A silent success in production would lose the lead; the form then tells the visitor to call.
    if (process.env.NODE_ENV === "production") {
      console.error("[inquiry] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID missing in production", lead);
      throw new Error("Telegram is not configured");
    }
    console.info("[inquiry] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID not set — logging only", {
      ...lead,
      receivedAt: new Date().toISOString(),
    });
    return;
  }

  const chatIds = chatIdsRaw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  const text = formatLeadMessage(lead);
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const results = await Promise.allSettled(
    chatIds.map(async (chat_id) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        throw new Error(
          `Telegram sendMessage failed for chat ${chat_id}: ${res.status} ${JSON.stringify(body)}`,
        );
      }
    }),
  );

  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  if (failures.length > 0) {
    throw new Error(failures.map((f) => f.reason?.message ?? String(f.reason)).join("; "));
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please call us instead." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields",
        issues: parsed.error.issues.map((i) => ({
          field: i.path[0],
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }

  // Honeypot tripped — respond as though it succeeded so the bot does not
  // learn to work around it, but drop the submission.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Strip the honeypot before the lead goes anywhere downstream.
  const lead = { ...parsed.data };
  delete (lead as Partial<typeof lead>).website;

  try {
    await deliverLead(lead);
  } catch (error) {
    console.error("[inquiry] delivery failed", error);
    return NextResponse.json(
      { error: "We could not record that. Please call us — we do not want to lose your request." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

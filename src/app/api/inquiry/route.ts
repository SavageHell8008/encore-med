import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lead intake.
 *
 * ⚠️ NOT YET WIRED TO A DESTINATION. Right now a validated enquiry is written
 * to the server log and nothing else — no email, no CRM, no database. That is
 * fine for local development and actively dangerous in production: every lead
 * would be silently lost, and `15-emergency-user-behavior.md` classes an
 * unanswered urgent enquiry as a high-severity operational failure, not a
 * missed marketing opportunity.
 *
 * Before launch, replace `deliverLead()` with a real destination (transactional
 * email to the ops inbox + a row in a database) and add alerting on failure.
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

async function deliverLead(lead: Record<string, unknown>) {
  // TODO: send to the ops inbox and persist. Until then, at least make the
  // lead visible in the deployment logs.
  console.info("[inquiry] new lead", {
    ...lead,
    receivedAt: new Date().toISOString(),
  });
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

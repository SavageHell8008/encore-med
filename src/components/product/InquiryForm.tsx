"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { BRAND, CONTACT, telLink, whatsappLink } from "@/lib/constants";
import {
  CITY_CHOICES,
  INTENT_OPTIONS,
  inquirySchema,
  type InquiryInput,
} from "@/lib/inquiry-schema";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

/**
 * Product-page enquiry form.
 *
 * Deliberate choices, all from `08-conversion-psychology.md`:
 * - Six fields, single view, no multi-step wizard at this length.
 * - Validation runs on blur and on submit, never on keystroke — validating as
 *   someone types shows an error before they have finished typing.
 * - A "ladder of commitment": call and WhatsApp sit above the form as zero-
 *   effort alternatives, so the form is never the only way through.
 */
export function InquiryForm({
  equipmentName,
  defaultIntent = "rent",
  compact = false,
}: {
  equipmentName: string;
  defaultIntent?: "rent" | "buy" | "not-sure";
  compact?: boolean;
}) {
  const [values, setValues] = useState<InquiryInput>({
    name: "",
    phone: "",
    city: CITY_CHOICES[0],
    intent: defaultIntent,
    equipment: equipmentName,
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function set<K extends keyof InquiryInput>(key: K, value: InquiryInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear an existing error as soon as the user starts fixing it, but never
    // create a new one mid-keystroke.
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateField(key: keyof InquiryInput) {
    const result = inquirySchema.safeParse(values);
    if (result.success) return;
    const issue = result.error.issues.find((i) => i.path[0] === key);
    setErrors((e) => ({ ...e, [key]: issue?.message }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof InquiryInput;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand-mint/40 bg-brand-mint/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-mint" aria-hidden />
        <h3 className="mt-4 text-lg font-semibold text-text-primary">Request received</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Someone who knows this equipment will call you on{" "}
          <span className="text-text-primary">{values.phone}</span>. If it is urgent, call
          us now rather than waiting.
        </p>
        <div className="mt-6 grid gap-2">
          <ButtonLink href={telLink()} variant="secondary" size="md">
            <Phone className="h-4 w-4" aria-hidden />
            {CONTACT.phoneDisplay}
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-line-strong bg-surface-raised/60 backdrop-blur-md",
        compact ? "p-6" : "p-6 sm:p-7",
      )}
    >
      <h2 className="text-lg font-semibold text-text-primary">Get the best quote</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
        Tell us how long you need it and what the patient is dealing with. You
        get a straight quote — and if a cheaper item does the same job, we will
        say so.
      </p>

      {/* Zero-effort rungs of the commitment ladder, above the form. */}
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <ButtonLink href={telLink()} variant="secondary" size="sm">
          <Phone className="h-4 w-4" aria-hidden />
          Call now
        </ButtonLink>
        <ButtonLink
          href={whatsappLink(`Hi ${BRAND.name}, I'm enquiring about: ${equipmentName}`)}
          variant="ghost"
          size="sm"
          external
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          WhatsApp
        </ButtonLink>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-text-muted">
        <span className="h-px flex-1 bg-line" />
        or send your details
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {/* Honeypot — visually and programmatically hidden from real users. */}
        <div className="hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </div>

        <Field label="Your name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => validateField("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(Boolean(errors.name))}
            placeholder="Full name"
          />
        </Field>

        <Field label="Phone number" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => validateField("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass(Boolean(errors.phone))}
            placeholder="10-digit mobile number"
          />
        </Field>

        <Field label="City" htmlFor="city" error={errors.city}>
          <select
            id="city"
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            className={inputClass(Boolean(errors.city))}
          >
            {CITY_CHOICES.map((city) => (
              <option key={city} value={city} className="bg-surface-raised">
                {city}
              </option>
            ))}
          </select>
        </Field>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-text-secondary">
            Rent or buy?
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {INTENT_OPTIONS.map((opt) => {
              const selected = values.intent === opt.value;
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition-all",
                    selected
                      ? "border-brand-green bg-brand-green/12 text-brand-green shadow-glow"
                      : "border-line-strong text-text-secondary hover:border-brand-green/40 hover:text-text-primary",
                  )}
                >
                  <input
                    type="radio"
                    name="intent"
                    value={opt.value}
                    checked={selected}
                    onChange={() => set("intent", opt.value)}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              );
            })}
          </div>
          {errors.intent && (
            <p className="mt-1.5 text-xs text-brand-amber">{errors.intent}</p>
          )}
        </fieldset>

        <Field label="Equipment" htmlFor="equipment" error={errors.equipment}>
          <input
            id="equipment"
            name="equipment"
            type="text"
            value={values.equipment}
            onChange={(e) => set("equipment", e.target.value)}
            onBlur={() => validateField("equipment")}
            className={inputClass(Boolean(errors.equipment))}
          />
        </Field>

        {!compact && (
          <Field label="Anything we should know? (optional)" htmlFor="message" error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              className={cn(inputClass(false), "resize-y")}
              placeholder="Patient weight, room access, how soon you need it…"
            />
          </Field>
        )}

        {serverError && (
          <p role="alert" className="rounded-lg border border-brand-amber/40 bg-brand-amber/10 px-3 py-2.5 text-sm text-brand-amber">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Request a callback"
          )}
        </Button>

        <p className="text-center text-xs leading-relaxed text-text-muted">
          We use your number to answer this enquiry and nothing else. See our{" "}
          <a href="/privacy" className="text-text-secondary underline underline-offset-2 hover:text-text-primary">
            privacy policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-text-secondary">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs text-brand-amber">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-surface/60 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors",
    "focus:border-brand-green focus:outline-none",
    hasError ? "border-brand-amber/60" : "border-line-strong hover:border-white/25",
  );
}

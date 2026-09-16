"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, Phone, XCircle } from "lucide-react";
import { CONTACT, telLink } from "@/lib/constants";

type CityRef = { slug: string; name: string };

/**
 * "Do you deliver to my pincode?" answered in one step.
 *
 * The lookup table is built on the server from the verified India Post data
 * and passed in, so the answer here can never disagree with the pincode lists
 * on the city pages.
 */
export function PincodeChecker({ index }: { index: Record<string, CityRef> }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<
    { kind: "hit"; city: CityRef; pincode: string } | { kind: "miss"; pincode: string } | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    const pin = value.replace(/\s/g, "");
    if (!/^\d{6}$/.test(pin)) {
      setResult(null);
      setError("Enter a 6-digit pincode");
      return;
    }
    setError(null);
    const city = index[pin];
    setResult(city ? { kind: "hit", city, pincode: pin } : { kind: "miss", pincode: pin });
  }

  return (
    <div className="rounded-2xl border border-line-strong bg-surface p-6 shadow-card sm:p-7">
      <form onSubmit={check} className="flex flex-col gap-3 sm:flex-row sm:items-start" noValidate>
        <div className="flex-1">
          <label htmlFor="pincode" className="text-sm font-semibold text-text-primary">
            Check your pincode
          </label>
          <input
            id="pincode"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={7}
            placeholder="e.g. 201301"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "pincode-error" : undefined}
            className="mt-2 w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-base text-text-primary outline-none transition focus:border-brand-green"
          />
          {error && (
            <p id="pincode-error" className="mt-2 text-sm text-brand-amber">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="rounded-xl bg-brand-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-green/90 sm:mt-7"
        >
          Check
        </button>
      </form>

      <div aria-live="polite">
        {result?.kind === "hit" && (
          <p className="mt-5 flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden />
            <span>
              Yes — <span className="font-semibold text-text-primary">{result.pincode}</span> is in{" "}
              <Link
                href={`/locations/${result.city.slug}`}
                className="font-semibold text-brand-green underline-offset-4 hover:underline"
              >
                {result.city.name}
              </Link>
              , and we deliver and install there.
            </span>
          </p>
        )}
        {result?.kind === "miss" && (
          <p className="mt-5 flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" aria-hidden />
            <span>
              <span className="font-semibold text-text-primary">{result.pincode}</span> is not on our
              Delhi NCR delivery list. If it is close to one of our areas, call{" "}
              <a href={telLink()} className="font-semibold text-brand-green underline-offset-4 hover:underline">
                <Phone className="mr-1 inline h-3.5 w-3.5" aria-hidden />
                {CONTACT.phoneDisplay}
              </a>{" "}
              and we will tell you honestly whether we can reach you.
            </span>
          </p>
        )}
        {!result && !error && (
          <p className="mt-4 flex items-center gap-2 text-xs text-text-muted">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Covers Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad and Faridabad.
          </p>
        )}
      </div>
    </div>
  );
}

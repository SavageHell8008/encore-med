"use client";

import { MessageCircle, Phone } from "lucide-react";
import { BRAND, CONTACT, telLink, whatsappLink } from "@/lib/constants";

/**
 * Persistent mobile contact bar.
 *
 * `15-emergency-user-behavior.md`: a visitor in acute need must be able to
 * reach a human without scrolling or reading. Two actions only — five
 * equal-weight CTAs is the failure mode competitors fall into, and it produces
 * decision fatigue exactly where clarity matters most.
 *
 * Hidden on desktop, where the header already carries both.
 */
export function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-strong bg-surface/92 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-2 gap-2 p-3">
        <a
          href={telLink()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-green/50 bg-brand-green/12 py-3 text-sm font-semibold text-brand-green"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Call {CONTACT.phoneDisplay}
        </a>
        <a
          href={whatsappLink(`Hi ${BRAND.name}, I need medical equipment.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-mint/50 bg-brand-mint/12 py-3 text-sm font-semibold text-brand-mint"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

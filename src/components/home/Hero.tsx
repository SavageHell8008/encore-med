"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BRAND, CONTACT, telLink, whatsappLink } from "@/lib/constants";

/*
 * The hero visual is a static illustration, not a Three.js scene.
 *
 * The 3D canvas cost roughly 400 KB of JavaScript on the most performance-
 * sensitive screen of the site and rendered a stylised approximation of a room.
 * A single optimised image says the same thing, converts to AVIF/WebP at build
 * time, and takes the entire three / @react-three dependency tree out of the
 * bundle. `10-performance.md` is unambiguous about which of those is worth
 * having on the LCP path.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Faint graph paper behind the hero only — it establishes the editorial
          grid without following the reader down the whole page. */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      {/* Wider than the site container on large screens. At max-w-7xl the hero
          had ~235px of dead margin either side on a 1750px display while the
          illustration was squeezed — the standard reading width is right for
          body content and wrong for a two-column hero. */}
      <Container className="relative pt-10 pb-14 sm:pt-14 lg:pt-16 lg:pb-14 xl:max-w-[88rem]">
        {/* Image column is the wider one. A 3:2 illustration is short for its
            width, so giving it the narrower half left it looking like a
            thumbnail beside a very tall heading. */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 xl:gap-10">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-green/30 bg-brand-green/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green"
            >
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Sanitised every rental · Installed in under 4 hours
            </motion.p>

            {/* Single H1, primary keyword first, two-tone so the scale reads as
                editorial rather than as shouting. */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-8 font-display text-[2.6rem] uppercase leading-[0.92] text-text-primary sm:text-6xl lg:text-[4.2rem]"
            >
              Medical equipment
              <span className="block text-text-muted">Your Health, Our Priority</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-8 max-w-xl text-base leading-relaxed text-text-secondary"
            >
              Hospital beds, oxygen concentrators, BiPAP machines and complete
              home ICU setups — on rent or for sale across Delhi NCR. Delivered,
              installed and demonstrated by a technician, usually within four
              hours. Tell us what you need and we will quote for it.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              // flex-wrap matters structurally, not just cosmetically: three
              // nowrap buttons in a row gave this column a 681px min-content
              // floor, which silently overrode the grid's fr ratio and pinned
              // the image to whatever was left over.
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <ButtonLink href="/products" variant="primary" size="lg">
                Browse equipment
              </ButtonLink>

              {/* Below lg the sticky bottom bar already carries call and
                  WhatsApp. Repeating them here would put four near-identical
                  CTAs on one mobile screen — the decision-fatigue pattern
                  20-competitor-ux-analysis.md found across the whole category. */}
              <ButtonLink
                href={telLink()}
                variant="secondary"
                size="lg"
                className="hidden lg:inline-flex"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {CONTACT.phoneDisplay}
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(`Hi ${BRAND.name}, I need help choosing equipment.`)}
                variant="ghost"
                size="lg"
                external
                className="hidden lg:inline-flex"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </ButtonLink>
            </motion.div>

            {/* Trust cues sit directly beside the CTA rather than further down
                the page: `15-emergency-user-behavior.md` finds stressed visitors
                do not register signals placed near-but-not-on the action. */}
            <motion.dl
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8"
            >
              {[
                { value: "< 4 hrs", label: "Delivered & installed" },
                { value: "24×7", label: "Breakdown replacement" },
                { value: "Rent or buy", label: "On most equipment" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-xl text-brand-mint sm:text-2xl">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Intrinsic 1:1, matching the source, so nothing is cropped and the
              box reserves exactly the right space — no layout shift. A square
              is what finally balances this hero: at the same column width it is
              half as tall again as the 3:2 version was, which puts it level
              with the heading block instead of floating in the middle of it.
              The negative right margin lets the illustration run into the
              container's own gutter on large screens, which buys real width
              without narrowing the text column (narrowing it would just add
              heading lines and make the imbalance worse). */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none lg:-mr-8 xl:-mr-12">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.10),transparent_65%)] blur-2xl"
            />
            {/* `priority` because this is above the fold and is the likely LCP
                element on desktop — lazy-loading it would delay the very metric
                the hero is judged on. */}
            <Image
              src="/hero.png"
              alt="A home ICU setup in a bedroom: a patient in a hospital bed on oxygen, with a cardiac monitor, ventilator, infusion pump, suction machine and oxygen cylinder around the bed, and a nurse in attendance."
              width={1024}
              height={1024}
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              // No border, no card frame — the illustration sits on its own
              // white ground, so a rule around it would draw a box in empty
              // space rather than containing anything.
              className="relative w-full"
            />
          </div>
        </div>

        {/* The scroll indicator that used to sit here read "What we supply"
            with a chevron — the same words as the section label immediately
            below it, separated by 236px of nothing. Two identical labels a
            screen apart is worse than no indicator, and the section heading
            already does the job of telling you what comes next. */}
      </Container>
    </section>
  );
}

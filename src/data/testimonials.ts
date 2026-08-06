export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  facility: string;
  city: string;
  /** Dated, because an undated testimonial is unverifiable by definition. */
  date: string;
  equipment: string;
};

/**
 * ⚠️ SAMPLE CONTENT — NOT REAL CUSTOMERS.
 *
 * Every entry below is written to exercise the layout. Publishing invented
 * testimonials attributed to named people and facilities is fabrication, and in
 * a healthcare context it is the fastest way to lose the trust the rest of this
 * site is built to earn. `20-competitor-ux-analysis.md` identifies genuine,
 * dated, verifiable testimonials as one of EnconeMed's strongest available
 * differentiators — which only works if they are genuine.
 *
 * The section is therefore gated: it renders only when
 * NEXT_PUBLIC_TESTIMONIALS_VERIFIED is set to "true", which should happen only
 * once these are replaced with real, consented, dated quotes.
 *
 * Note also (`07-eeat.md`, `08-schema.md`): these must NEVER be marked up as
 * Review or AggregateRating on the Organization — self-serving review markup is
 * prohibited and Google will not render it regardless of correctness.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The bed arrived four hours after we called and the technician stayed until my mother's attendant could raise and lower it herself. That mattered more than the equipment.",
    name: "Sample Name",
    role: "Daughter, primary caregiver",
    facility: "Home care",
    city: "New Delhi",
    date: "2026-06-14",
    equipment: "Semi-Electric Hospital Bed",
  },
  {
    quote:
      "Everywhere else the number changed depending on who I spoke to. Here I got one quote, in writing, on the first call — and it was still the same number when the bed arrived.",
    name: "Sample Name",
    role: "Son, arranging care remotely",
    facility: "Home care",
    city: "Delhi",
    date: "2026-05-29",
    equipment: "Oxygen Concentrator — 5 LPM",
  },
  {
    quote:
      "Our concentrator failed at eleven at night. A replacement was at the door before one. For a patient on continuous oxygen that is the whole service.",
    name: "Sample Name",
    role: "Nursing supervisor",
    facility: "Sample facility",
    city: "New Delhi",
    date: "2026-07-02",
    equipment: "Home ICU Setup",
  },
];

export const TESTIMONIALS_VERIFIED =
  process.env.NEXT_PUBLIC_TESTIMONIALS_VERIFIED === "true";

import type { Category, UseCase } from "@/lib/types";

/**
 * Door 1 — object-type taxonomy (what the thing *is*).
 * `05-information-architecture-research.md`: keep this flat and cross-link it
 * with the situation taxonomy below; never nest one inside the other.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "hospital-beds",
    name: "Hospital Beds",
    laySynonyms: ["patient bed", "adjustable bed", "bed for bedridden patient"],
    headline: "Hospital Beds on Rent & Sale in Delhi NCR",
    description:
      "Manual, semi-electric and fully electric beds for home care and facilities — delivered, assembled and demonstrated by a technician the same day.",
    icon: "bed",
  },
  {
    slug: "oxygen-therapy",
    name: "Oxygen Therapy",
    laySynonyms: ["oxygen machine", "breathing machine", "oxygen ka machine"],
    headline: "Oxygen Concentrators & Cylinders for Home Use",
    description:
      "Continuous-flow concentrators, portable units and medical cylinders — with the flow rates, purity figures and running costs stated plainly.",
    icon: "wind",
  },
  {
    slug: "bipap-cpap",
    name: "BiPAP & CPAP",
    laySynonyms: ["sleep apnea machine", "breathing support machine", "ventilator for sleep"],
    headline: "BiPAP & CPAP Machines",
    description:
      "Non-invasive ventilation for sleep apnoea, COPD and respiratory failure — supplied with a fitted mask, not a generic one.",
    icon: "activity",
  },
  {
    slug: "wheelchairs",
    name: "Wheelchairs & Mobility",
    laySynonyms: ["wheel chair", "chair with wheels", "mobility chair"],
    headline: "Wheelchairs, Walkers & Mobility Aids",
    description:
      "Manual, reclining and powered wheelchairs sized to the user rather than sold one-size-fits-all.",
    icon: "accessibility",
  },
  {
    slug: "patient-monitors",
    name: "Patient Monitors",
    laySynonyms: ["heart monitor", "vitals machine", "ECG machine"],
    headline: "Multi-Para Patient Monitors",
    description:
      "5-para and 7-para bedside monitors for home ICU setups and step-down care, with alarm configuration on delivery.",
    icon: "monitor",
  },
  {
    slug: "pressure-care",
    name: "Pressure Care",
    laySynonyms: ["air bed", "water bed for patient", "bed sore mattress"],
    headline: "Air Mattresses & Pressure Sore Prevention",
    description:
      "Alternating-pressure mattresses that stop any one area of skin bearing weight continuously — the single most effective addition for a bedbound patient.",
    icon: "layers",
  },
  {
    slug: "suction",
    name: "Suction Machines",
    laySynonyms: ["kaf nikalne ki machine", "mucus machine", "aspirator"],
    headline: "Suction Machines for Airway Clearance",
    description:
      "Mains and battery-powered suction for tracheostomy care and patients who cannot clear their own secretions.",
    icon: "stethoscope",
  },
  {
    slug: "pumps",
    name: "Infusion & Compression Pumps",
    laySynonyms: ["drip machine", "IV pump", "leg pump"],
    headline: "Infusion, Syringe & DVT Pumps",
    description:
      "Controlled fluid and drug delivery, and pneumatic compression for clot prevention in immobile patients.",
    icon: "droplets",
  },
  {
    slug: "hospital-furniture",
    name: "Hospital Furniture",
    laySynonyms: ["patient room furniture", "overbed table", "bedside table"],
    headline: "Hospital & Care Room Furniture",
    description:
      "Overbed tables, bedside lockers, IV stands, attendant stools and screens — what turns a bedroom into a workable care room.",
    icon: "armchair",
  },
  {
    slug: "icu-setup",
    name: "Home ICU Setup",
    laySynonyms: ["ICU at home", "critical care at home", "home ventilator setup"],
    headline: "Complete Home ICU Setup",
    description:
      "A coordinated bundle — bed, monitor, suction, oxygen and pressure care — installed and configured together so nothing is missing at 2 AM.",
    icon: "heart-pulse",
  },
];

/**
 * Door 2 — situation taxonomy (what the *problem* is).
 * `14-mental-models.md`: caregivers arrive saying "she can't breathe" or
 * "he can't get out of bed", not "non-invasive ventilation" or "mobility aid".
 */
export const USE_CASES: UseCase[] = [
  {
    slug: "breathing-difficulty",
    name: "Trouble breathing",
    description:
      "Low oxygen saturation, breathlessness at rest, COPD flare-ups or post-COVID recovery.",
  },
  {
    slug: "cannot-get-out-of-bed",
    name: "Can't get out of bed",
    description:
      "Bedridden or partially mobile patients who need positioning support and pressure-sore prevention.",
  },
  {
    slug: "post-surgery-recovery",
    name: "Recovering after surgery",
    description:
      "Short-term rentals for the weeks between hospital discharge and independent movement.",
  },
  {
    slug: "critical-care-at-home",
    name: "Critical care at home",
    description:
      "Continuous monitoring, ventilation and suction for patients discharged on long-term support.",
  },
  {
    slug: "elderly-daily-care",
    name: "Day-to-day elderly care",
    description:
      "Long-running arrangements for ageing parents — mobility, comfort and fall prevention.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getUseCase(slug: string): UseCase | undefined {
  return USE_CASES.find((u) => u.slug === slug);
}

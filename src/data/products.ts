import { profile } from "@/data/medical-profiles";
import type { Product, ProductImage } from "@/lib/types";

/**
 * The Encone Care catalogue.
 *
 * Two sources of truth sit behind this file:
 *  - `public/Equipment/rental`  — stocked for rental; these can also be bought.
 *  - `public/Equipment/for-sale` — sale only; the rental fleet does not carry them.
 * That distinction is what `offerMode` encodes, and it is the one commercial
 * fact the catalogue does state. Everything else about money is a conversation.
 *
 * NO PRICES. There is no field on `Product` that can hold one — see the note at
 * the top of `src/lib/types.ts`. Every commercial CTA resolves to a quote.
 *
 * Clinical content comes from the shared family profiles in
 * `medical-profiles.ts`, layered with per-product specifics. Devices in a family
 * share their real contraindications; duplicating them per product would only
 * let them drift apart.
 */

/** Source photographs are square 800×800, so cards and galleries letterbox
 *  rather than crop — `object-contain`, not `object-cover`. */
const SQUARE = { width: 800, height: 800 } as const;

function img(
  folder: string,
  file: string,
  alt: string,
  kind: ProductImage["kind"] = "hero",
): ProductImage {
  return { src: `/Equipment/${folder}/${file}`, alt, kind, ...SQUARE };
}

/** Equipment delivery is live in Delhi only; see SERVICE_AREAS. */
const DELHI = [{ city: "delhi", sameDay: true }, { city: "new-delhi", sameDay: true }];

const REVIEWER = {
  name: "Encone Care clinical team",
  credentials: "GNM/B.Sc. nursing leads, Encone Care Nurse Private Limited",
  date: "2026-08-06",
};

const UPDATED = "2026-08-06";

export const PRODUCTS: Product[] = [
  /* ================================================================== */
  /*  RENT OR BUY                                                        */
  /* ================================================================== */

  {
    slug: "hospital-bed",
    name: "Hospital Bed",
    summary:
      "Two- and three-function manual hospital bed with adjustable backrest and knee-rest, side rails and locking castors — the standard bed for home care after a hospital discharge.",
    categorySlug: "hospital-beds",
    useCaseSlugs: ["cannot-get-out-of-bed", "post-surgery-recovery", "elderly-daily-care"],
    description:
      "A manual hospital bed does the two things an ordinary bed cannot: it raises the patient's head without a pile of pillows sliding out from under them, and it raises the whole platform to a height where a carer can wash, change and turn someone without wrecking their own back. The backrest and knee-rest run off crank handles at the foot end, so nothing depends on the power supply. Side rails fold down for transfers and lock up for sleep. For a family bringing a parent home after a fracture, a stroke or abdominal surgery, this is usually the right first bed — the electric versions add convenience, not capability.",
    indications: [
      "Discharge home after surgery, fracture or stroke with limited mobility",
      "Patients who need the head of the bed raised for breathing or feeding",
      "Any situation where a carer is lifting, washing or turning the patient daily",
      "Long-term elderly care where an ordinary bed is too low to work at",
    ],
    audience: [
      "Families caring for a bedbound or partially mobile relative at home",
      "Nursing homes and small care facilities",
      "Clinics needing extra beds for short-stay observation",
    ],
    brandsAvailable: ["Hospiline", "Godrej Interio", "Surgihub", "Assorted OEM"],
    specifications: [
      { label: "Functions", value: "2 or 3 (backrest, knee-rest, and height on 3-function)" },
      { label: "Operation", value: "Manual crank handles at the foot end", note: "Works during a power cut, unlike the electric versions." },
      { label: "Backrest range", value: "0–75°" },
      { label: "Knee-rest range", value: "0–40°" },
      { label: "Side rails", value: "Collapsible steel, both sides" },
      { label: "Castors", value: "125 mm, four-wheel, two with brakes" },
      { label: "Mattress", value: "Included — foam, waterproof cover" },
      { label: "Frame", value: "Powder-coated mild steel with ABS head and foot boards" },
    ],
    dimensions: {
      length: "2060 mm overall",
      width: "900 mm overall",
      height: "500–720 mm on the 3-function model",
      weight: "Approximately 75 kg assembled",
      loadCapacity: "200 kg including mattress",
    },
    alsoKnowAbout: [
      { label: "The mattress is not a pressure mattress", value: "The included foam mattress is a sleeping surface. A patient immobile more than 16 hours a day needs an alternating-pressure air mattress on top of it, or pressure sores will develop regardless of the bed." },
      { label: "Cranking is a real task", value: "Adjusting a manual bed takes 20–30 turns of the handle. Where the head is raised and lowered many times a day — reflux, feeding, breathlessness — an electric bed pays for itself in carer effort." },
      { label: "Measure the doorway first", value: "The frame arrives in sections but the assembled bed is 900 mm wide. Anything narrower than 800 mm means assembling inside the room." },
      { label: "It needs access on both sides", value: "Turning a patient is a two-sided job. A bed pushed against a wall makes proper repositioning impossible, which is how pressure sores start." },
    ],
    faqs: [
      { question: "Is a manual hospital bed good enough, or should I get electric?", answer: "Manual is sufficient for most home care. Choose electric when the head of the bed is adjusted many times a day, when the patient wants to adjust it themselves, or when the carer is elderly or has a back problem of their own." },
      { question: "Does the bed come with a mattress?", answer: "Yes, a waterproof-covered foam mattress is included. It is a sleeping surface, not a pressure-relieving one — bedbound patients also need an alternating-pressure air mattress." },
      { question: "Can I rent a hospital bed for one month?", answer: "Yes. Rental is the usual choice for recovery periods of a few weeks to a few months. Call us and we will tell you honestly whether renting or buying works out better for your expected duration." },
      { question: "How long does delivery and installation take?", answer: "Within four hours across Delhi in most cases. The technician assembles the bed in the room, fits the rails and mattress, and shows whoever is caring for the patient how to operate everything before leaving." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "Hospital_Bed.jpg", "Manual hospital bed with adjustable backrest, side rails and locking castors")],
    availability: DELHI,
    relatedSlugs: ["icu-bed", "air-bed", "electric-hospital-bed", "wheelchair"],
    badges: ["bestseller", "sanitised", "same-day-delivery", "technician-installed"],
    cdscoClass: "A",
    medical: profile("bed"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "icu-bed",
    name: "ICU Bed",
    summary:
      "Five-function motorised ICU bed with Trendelenburg tilt, mechanical CPR release and radiolucent platform — for patients discharged on continuing critical care.",
    categorySlug: "hospital-beds",
    useCaseSlugs: ["critical-care-at-home", "cannot-get-out-of-bed"],
    description:
      "An ICU bed differs from a ward bed in the two positions it can reach and the one thing it can undo. Trendelenburg and reverse-Trendelenburg tilt the whole platform head-down or head-up, which matters for circulation, ventilation and drainage in a clinically unstable patient. The mechanical CPR release drops the backrest flat in a single pull, because chest compressions on a raised backrest do not work. Everything runs off a handset with a lockout so a confused patient cannot re-position themselves. This is the bed for someone coming home still on oxygen, still being suctioned, still being monitored.",
    indications: [
      "Discharge home on continuing critical or high-dependency care",
      "Patients requiring clinician-directed tilt positioning",
      "Long-term ventilated, tracheostomised or unconscious patients",
      "Home ICU setups where a monitor and suction are also in use",
    ],
    audience: [
      "Families running a home ICU with trained nursing cover",
      "Critical care and step-down units",
      "Palliative and long-term care facilities",
    ],
    brandsAvailable: ["Hospiline", "Narang Medical", "Surgihub", "Assorted OEM"],
    specifications: [
      { label: "Functions", value: "5 — backrest, knee-rest, height, Trendelenburg, reverse-Trendelenburg" },
      { label: "Operation", value: "Motorised handset with lockout; manual crank backup" },
      { label: "CPR release", value: "Mechanical, single-pull backrest drop", note: "The one control that has to work under pressure. Check it at every shift handover." },
      { label: "Tilt range", value: "±12° Trendelenburg / reverse" },
      { label: "Platform", value: "Four-section radiolucent, X-ray cassette channel" },
      { label: "Side rails", value: "Polymer, collapsible, full length" },
      { label: "Backup", value: "Internal battery for positioning during a power cut", note: "Covers movement only — it is not a substitute for a life-support inverter." },
    ],
    dimensions: {
      length: "2150 mm overall",
      width: "990 mm overall",
      height: "450–800 mm",
      weight: "Approximately 132 kg assembled",
      loadCapacity: "250 kg including mattress",
    },
    alsoKnowAbout: [
      { label: "It is heavy and it needs a lift", value: "At 132 kg the bed cannot be carried safely above the third floor without a service lift. We will decline the installation rather than attempt it — a dropped bed frame in a stairwell is not a recoverable situation." },
      { label: "Tilt is a clinical setting, not a comfort setting", value: "Head-down tilt is contraindicated in raised intracranial pressure and raises aspiration risk. The positions available should be agreed with the treating doctor and not adjusted for comfort." },
      { label: "Still needs a pressure mattress", value: "No bed frame prevents pressure ulcers. An alternating-pressure air mattress is effectively mandatory for a continuously bedbound patient." },
      { label: "Check line slack before every tilt", value: "Ventilator circuits, catheters and infusion lines pull taut when the platform tilts. Dislodging a line is the most common avoidable incident with these beds." },
    ],
    faqs: [
      { question: "What is the difference between an ICU bed and a hospital bed?", answer: "An ICU bed adds Trendelenburg tilt, motorised height, a mechanical CPR release and a radiolucent platform for bedside X-rays. A hospital bed adjusts the backrest and knee-rest only. If the patient is clinically stable, a hospital bed is usually the right choice." },
      { question: "Can I set up an ICU bed at home?", answer: "Yes, provided the room takes roughly 3.0 m × 2.2 m with access on both sides, there is a service lift above the third floor, and trained nursing cover is arranged. We commission the bed and demonstrate the CPR release before leaving." },
      { question: "Does it work during a power cut?", answer: "An internal battery covers repositioning, and there is a manual crank backup. It does not power anything else — a ventilated patient needs a separately sized inverter." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "ICU_Bed.jpg", "Five-function motorised ICU bed with tilt and collapsible polymer side rails")],
    availability: DELHI,
    relatedSlugs: ["icu-setup-at-home", "patient-monitor", "air-bed", "five-function-electric-icu-bed"],
    badges: ["sanitised", "technician-installed"],
    cdscoClass: "A",
    medical: profile("bed", {
      contraindications: [
        { name: "Trendelenburg in raised intracranial pressure", description: "Head-down tilt is contraindicated where intracranial pressure is raised. Tilt settings must be directed by the treating clinician, not chosen by the carer." },
        { name: "No lift access above the third floor", description: "At 132 kg the bed cannot be carried safely up more than three floors without a service lift; installation will be refused rather than attempted." },
      ],
      adverseOutcomes: [
        { name: "Line or tube dislodgement during tilt", description: "Ventilator circuits, catheters and infusion lines can be pulled taut when the bed tilts. Check slack before every position change." },
        { name: "Delayed resuscitation from CPR release failure", description: "If the mechanical CPR release is obstructed or untested, the backrest cannot be dropped flat quickly enough for effective chest compressions.", serious: true },
        { name: "Aspiration in head-down tilt", description: "Prolonged or unsupervised Trendelenburg positioning can cause aspiration of gastric contents.", serious: true },
      ],
      specialties: ["Nursing", "Neurologic", "Emergency"],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "oxygen-concentrator",
    name: "Oxygen Concentrator",
    summary:
      "5 LPM and 10 LPM continuous-flow oxygen concentrators with humidifier, low-purity alarm and power-failure alarm — supplied only against a prescribed flow rate.",
    categorySlug: "oxygen-therapy",
    useCaseSlugs: ["breathing-difficulty", "critical-care-at-home", "elderly-daily-care"],
    description:
      "A concentrator makes oxygen out of room air, so unlike a cylinder it never runs out and never needs refilling — as long as there is power. It draws in air, strips the nitrogen out through a molecular sieve, and delivers 90–95% oxygen at the flow you set. The 5 LPM unit covers most home prescriptions. The 10 LPM unit exists for higher prescriptions and for splitting between two patients, and is substantially louder. Both come with a humidifier bottle, because dry oxygen at 3 litres a minute will crack a patient's nose open inside a week.",
    indications: [
      "COPD, pulmonary fibrosis and other chronic hypoxaemic conditions",
      "Post-COVID recovery with a documented oxygen requirement",
      "Long-term oxygen therapy prescribed for home use",
      "Palliative care where breathlessness is a dominant symptom",
    ],
    audience: [
      "Patients on long-term oxygen therapy at home",
      "Families caring for a relative with chronic lung disease",
      "Clinics and nursing homes needing a continuous oxygen source",
    ],
    brandsAvailable: ["Philips Respironics", "Nidek", "Longfian", "Oxymed"],
    specifications: [
      { label: "Flow rates", value: "0.5–5 LPM, or 1–10 LPM on the larger unit" },
      { label: "Oxygen purity", value: "93% ±3 at rated flow", note: "Purity falls as flow approaches the maximum; this is normal for pressure-swing adsorption." },
      { label: "Power draw", value: "Approximately 350–400 W (5 LPM); 850–950 W (10 LPM)" },
      { label: "Noise", value: "Around 45 dB(A) at 5 LPM; around 58 dB(A) at 10 LPM", note: "58 dB(A) is conversation-loud — do not site the 10 LPM unit in the bedroom." },
      { label: "Alarms", value: "Low purity, power failure, high and low pressure" },
      { label: "Humidifier", value: "Included; use distilled water only" },
      { label: "Filters", value: "Washable gross particle filter plus an outlet filter" },
    ],
    dimensions: { height: "580–670 mm", width: "380 mm", length: "320 mm", weight: "16–27 kg depending on capacity" },
    alsoKnowAbout: [
      { label: "The electricity bill is real", value: "A 5 LPM unit running 24 hours draws roughly 9–10 units a day. At Delhi domestic tariffs that is a meaningful monthly cost and people are routinely surprised by it. Budget for it before you commit." },
      { label: "You need a backup for a dependent patient", value: "The concentrator stops the moment power fails. If the patient cannot tolerate a gap, you need a cylinder standing by or an inverter rated for a continuous 400 W load — a normal home inverter usually is not." },
      { label: "Never adjust the flow yourself", value: "The flow rate is a prescription. Turning it up because the patient 'seems breathless' can suppress respiratory drive in a COPD patient and cause carbon dioxide narcosis." },
      { label: "Oxygen makes fires worse", value: "In an oxygen-enriched room, fabric and hair ignite far more readily. No smoking, no cooking flame, and no petroleum-based ointment on the face." },
    ],
    faqs: [
      { question: "How much does an oxygen concentrator cost to run?", answer: "A 5 LPM unit uses roughly 350–400 W, which is about 9–10 units of electricity per day if it runs continuously. The 10 LPM unit is more than double that. This running cost is often larger than people expect and is worth working out before committing." },
      { question: "Do I need a prescription for an oxygen concentrator?", answer: "Yes. Oxygen is a drug and the flow rate must be set by the treating clinician. We ask for the prescribed litres per minute before delivery and set the machine to it." },
      { question: "Concentrator or cylinder — which should I choose?", answer: "A concentrator for continuous long-term use, because it never runs out while power holds. A cylinder for short-term needs, for backup, and for transport. Most oxygen-dependent patients at home end up with both." },
      { question: "Can two patients share one concentrator?", answer: "Only with the treating clinician's approval, using the 10 LPM unit and a splitter. Dividing the output changes the delivered concentration to both patients, so it is a clinical decision rather than a convenience." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "Oxygen_Concentrator.jpg", "Continuous-flow oxygen concentrator with humidifier bottle and flow meter")],
    availability: DELHI,
    relatedSlugs: ["oxygen-cylinder", "portable-oxygen-concentrator", "bipap-machine", "patient-monitor"],
    badges: ["bestseller", "sanitised", "same-day-delivery"],
    cdscoClass: "B",
    medical: profile("oxygen", {
      contraindications: [
        { name: "High-flow prescriptions above the unit's rating", description: "A 5 LPM unit holds its rated purity only up to 5 litres per minute. Prescriptions above that need the 10 LPM concentrator, not the smaller unit turned up." },
      ],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "oxygen-cylinder",
    name: "Oxygen Cylinder",
    summary:
      "Portable and large medical oxygen cylinders supplied with regulator, flow meter, humidifier and trolley — for backup, transport and short-term therapy.",
    categorySlug: "oxygen-therapy",
    useCaseSlugs: ["breathing-difficulty", "critical-care-at-home", "post-surgery-recovery"],
    description:
      "A cylinder holds compressed medical oxygen and delivers it through a regulator, which means it works with no electricity at all. That single property is why almost every oxygen-dependent patient at home should have one even if they also have a concentrator: when the power goes, the concentrator stops and the cylinder does not. Sizes run from small portable units for a hospital visit or a trip to the clinic, up to large static cylinders for continuous supply. The trade-off is that a cylinder empties, and someone has to notice before it does.",
    indications: [
      "Backup oxygen for a patient dependent on a concentrator",
      "Transport to and from hospital or clinic appointments",
      "Short-term oxygen therapy after discharge",
      "Any home where the power supply is unreliable",
    ],
    audience: [
      "Oxygen-dependent patients and their families",
      "Home ICU setups needing an uninterruptible source",
      "Clinics, ambulances and small facilities",
    ],
    brandsAvailable: ["INOX Air Products", "Linde", "Assorted OEM"],
    specifications: [
      { label: "Sizes", value: "Portable (B-type, ~10 L water capacity) and large (D-type, ~46.7 L)" },
      { label: "Approximate duration", value: "A D-type cylinder runs roughly 8–9 hours at 5 LPM", note: "Halve the time if you double the flow. Plan refills against this, not against a feeling." },
      { label: "Regulator", value: "Twin-gauge, included — cylinder pressure and delivered flow" },
      { label: "Flow range", value: "0–15 LPM" },
      { label: "Humidifier", value: "Included; distilled water only" },
      { label: "Trolley", value: "Supplied with large cylinders" },
    ],
    dimensions: { height: "Approximately 700 mm portable; 1320 mm large", weight: "Approximately 10 kg portable; 60 kg large when full" },
    alsoKnowAbout: [
      { label: "Refilling is on you to schedule", value: "A cylinder gives no warning beyond the pressure gauge. Read it daily and arrange the refill at a quarter full, not when it runs out at 3 AM." },
      { label: "It must be secured upright", value: "A full D-type cylinder weighs around 60 kg. Toppled, it can injure someone or shear the valve. It stays on the trolley or chained to a wall — never propped against furniture." },
      { label: "Cold hands at high flow", value: "Gas expanding through the regulator gets cold. This is normal, but it is why the regulator should not be adjusted with wet hands in winter." },
      { label: "Same fire rules as a concentrator", value: "Oxygen enrichment makes everything nearby burn faster. No flame, no smoking, no oil-based emollient on the patient's face." },
    ],
    faqs: [
      { question: "How long does an oxygen cylinder last?", answer: "A large D-type cylinder runs roughly 8–9 hours at 5 litres per minute, and proportionally less at higher flows. A portable B-type is measured in hours, not days — it is for transport and backup, not continuous therapy." },
      { question: "Should I get a cylinder or a concentrator?", answer: "A concentrator for continuous use, because it does not run out. A cylinder for backup and transport, because it does not need power. Most oxygen-dependent patients at home need both." },
      { question: "Do you refill cylinders?", answer: "Yes, refill and exchange are arranged within the service area. Call us at about a quarter full rather than at empty, so the exchange happens before you need it." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "Oxygen_Cylinder.jpg", "Medical oxygen cylinder with twin-gauge regulator, humidifier bottle and trolley")],
    availability: DELHI,
    relatedSlugs: ["oxygen-concentrator", "portable-oxygen-concentrator", "icu-setup-at-home"],
    badges: ["sanitised", "same-day-delivery"],
    cdscoClass: "B",
    medical: profile("oxygen", {
      procedure:
        "Delivered upright on a trolley or secured to a wall bracket. The technician fits the regulator, checks for leaks at the valve, sets the prescribed flow, fills the humidifier with distilled water, and shows the carer how to read the contents gauge and when to call for a refill.",
      contraindications: [
        { name: "Storing or using the cylinder unsecured", description: "A full cylinder weighs around 60 kg. Toppling can injure someone or shear the valve, which turns the cylinder into a projectile." },
      ],
      adverseOutcomes: [
        { name: "Supply running out unnoticed", description: "Unlike a concentrator, a cylinder empties. Without a daily gauge check an oxygen-dependent patient can be left without supply.", serious: true },
      ],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "bipap-machine",
    name: "BiPAP Machine",
    summary:
      "Bi-level positive airway pressure machine with heated humidifier, supplied with an in-person mask fitting and clinician-set pressures.",
    categorySlug: "bipap-cpap",
    useCaseSlugs: ["breathing-difficulty", "critical-care-at-home"],
    description:
      "BiPAP delivers two pressures — a higher one as the patient breathes in and a lower one as they breathe out. That difference is what makes it tolerable for hours at a time and what makes it work where plain CPAP does not: in COPD, in obesity hypoventilation, in neuromuscular weakness, and in anyone who has to be helped to breathe out as well as in. The machine is the straightforward part. The mask is not: mask leak is the single commonest reason home therapy gets abandoned, so we fit it in person and try the styles rather than assuming a medium.",
    indications: [
      "COPD with carbon dioxide retention",
      "Obesity hypoventilation syndrome",
      "Neuromuscular weakness affecting the respiratory muscles",
      "Complex or central sleep apnoea where CPAP has failed",
    ],
    audience: [
      "Patients prescribed non-invasive ventilation for home use",
      "Families managing chronic respiratory failure at home",
      "Sleep clinics and step-down units",
    ],
    brandsAvailable: ["ResMed", "Philips Respironics", "BMC", "Löwenstein"],
    specifications: [
      { label: "Pressure range", value: "4–25 cm H₂O" },
      { label: "Modes", value: "S, S/T, T and auto-adjusting, depending on model" },
      { label: "Humidifier", value: "Heated, integrated; distilled water only" },
      { label: "Ramp", value: "Adjustable, up to 45 minutes" },
      { label: "Leak compensation", value: "Automatic" },
      { label: "Data", value: "On-board compliance and AHI logging for the treating clinician" },
      { label: "Mask", value: "Fitted in person — nasal, nasal-pillow or full-face" },
    ],
    dimensions: { width: "270 mm", length: "150 mm", height: "90 mm", weight: "Approximately 1.5 kg with humidifier" },
    alsoKnowAbout: [
      { label: "The mask matters more than the machine", value: "Nearly every abandoned BiPAP is a mask problem, not a machine problem. We re-fit free within the first two weeks, which is when the trouble shows up. Tell us rather than tightening the straps — over-tightening causes the nasal bridge sores it is meant to prevent." },
      { label: "Pressures are prescribed, not chosen", value: "IPAP and EPAP come from a sleep study or a blood gas assessment. We will not supply a machine on guessed settings, because the wrong pressure in a retaining patient is dangerous rather than merely ineffective." },
      { label: "Distilled water only", value: "Tap water scales the humidifier chamber and the mineral residue ends up in the airway. This is the most common maintenance failure we see." },
      { label: "Consumables are ongoing", value: "Mask cushions last around three months and filters around a month. Budget for them — a perished cushion leaks, and a leaking mask is an untreated patient." },
    ],
    faqs: [
      { question: "What is the difference between BiPAP and CPAP?", answer: "CPAP holds one constant pressure. BiPAP uses a higher pressure to breathe in and a lower one to breathe out, which makes it tolerable at higher pressures and lets it help patients who struggle to exhale — COPD, obesity hypoventilation, neuromuscular weakness. CPAP is usually first-line for straightforward obstructive sleep apnoea." },
      { question: "Do I need a sleep study before renting a BiPAP machine?", answer: "You need clinician-set pressures, which normally come from a sleep study or a blood gas assessment. Encone Care runs home sleep studies if you do not have one yet." },
      { question: "Can I rent a BiPAP machine to try it first?", answer: "Yes, and it is a sensible way to start — tolerance varies a lot between patients, and rental lets you find out before buying. Call us for a quote covering the trial period." },
      { question: "How often do the mask and filters need replacing?", answer: "Mask cushions roughly every three months, filters roughly monthly. Both are ordinary consumables and both are cheap relative to the cost of therapy failing because of a leak." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "Bipap_Machine.jpg", "Bi-level positive airway pressure machine with integrated heated humidifier")],
    availability: DELHI,
    relatedSlugs: ["cpap-machine", "bipap-system-st", "oxygen-concentrator", "patient-monitor"],
    badges: ["bestseller", "sanitised", "technician-installed"],
    cdscoClass: "C",
    medical: profile("pap"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "cpap-machine",
    name: "CPAP Machine",
    summary:
      "Continuous positive airway pressure machine with heated humidifier for obstructive sleep apnoea — supplied with an in-person mask fitting.",
    categorySlug: "bipap-cpap",
    useCaseSlugs: ["breathing-difficulty", "elderly-daily-care"],
    description:
      "CPAP holds one steady pressure through the whole breath, splinting the upper airway open so it cannot collapse during sleep. For straightforward obstructive sleep apnoea it is the first-line treatment and it works well — patients who stick with it usually report the difference within a fortnight. Sticking with it is the whole problem, and it comes down to the mask and the humidifier rather than the machine. We fit the mask in person and set the humidity, because a dry throat at 3 AM is how CPAP ends up in a cupboard.",
    indications: [
      "Diagnosed obstructive sleep apnoea",
      "Heavy snoring with witnessed apnoeas and daytime sleepiness",
      "Post-operative airway support where prescribed",
    ],
    audience: [
      "Patients diagnosed with obstructive sleep apnoea",
      "Anyone trialling CPAP before committing to a purchase",
      "Sleep clinics",
    ],
    brandsAvailable: ["ResMed", "Philips Respironics", "BMC", "Löwenstein"],
    specifications: [
      { label: "Pressure range", value: "4–20 cm H₂O" },
      { label: "Mode", value: "Fixed-pressure CPAP" },
      { label: "Humidifier", value: "Heated, integrated; distilled water only" },
      { label: "Ramp", value: "Adjustable, up to 45 minutes", note: "Starts low and builds, so you can fall asleep before full pressure arrives." },
      { label: "Expiratory relief", value: "Pressure drop on exhalation, model-dependent" },
      { label: "Data", value: "On-board compliance and AHI logging" },
      { label: "Mask", value: "Fitted in person — nasal, nasal-pillow or full-face" },
    ],
    dimensions: { width: "260 mm", length: "150 mm", height: "85 mm", weight: "Approximately 1.3 kg with humidifier" },
    alsoKnowAbout: [
      { label: "The first two weeks are the hard part", value: "Most people who give up on CPAP do so early, over mask fit or dryness. Both are fixable. Call us during that fortnight instead of stopping — we re-fit the mask free." },
      { label: "Fixed pressure, not automatic", value: "This is a fixed-pressure machine set to your prescription. If your pressure requirement varies through the night, ask the treating clinician about an auto-titrating unit instead." },
      { label: "Distilled water only", value: "Tap water scales the humidifier chamber and leaves mineral residue in the air path. It is the most common maintenance failure we see." },
      { label: "It treats, it does not cure", value: "Apnoeas return the night you stop using it. CPAP is ongoing therapy, which is why long-term users usually buy rather than rent." },
    ],
    faqs: [
      { question: "How long before CPAP starts working?", answer: "Most patients notice better daytime alertness within one to two weeks of consistent nightly use. The therapy only works on nights you use it — benefits do not accumulate through gaps." },
      { question: "Should I rent or buy a CPAP machine?", answer: "Rent if you are trialling therapy or unsure about tolerance. Buy if you have an established diagnosis and a pressure that works, since sleep apnoea does not resolve on its own. Ask us for a quote on both and we will lay out the comparison." },
      { question: "Can I use tap water in the humidifier?", answer: "No. Tap water scales the chamber and leaves mineral residue in the air path. Distilled water only." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "CPAP_Machine.jpg", "Continuous positive airway pressure machine with heated humidifier and mask")],
    availability: DELHI,
    relatedSlugs: ["auto-cpap-system", "bipap-machine", "oxygen-concentrator"],
    badges: ["sanitised", "technician-installed"],
    cdscoClass: "C",
    medical: profile("pap", {
      procedure:
        "The mask is fitted in person — nasal, nasal-pillow and full-face styles are tried rather than a medium being assumed. The fixed pressure is set to the clinician's prescription, ramp and humidity are configured, the chamber is filled with distilled water, and the patient wears the mask under pressure before the technician leaves.",
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "patient-monitor",
    name: "Patient Monitor",
    summary:
      "Multi-parameter bedside monitor covering ECG, SpO₂, non-invasive blood pressure, respiration and temperature, with alarm limits configured at installation.",
    categorySlug: "patient-monitors",
    useCaseSlugs: ["critical-care-at-home", "cannot-get-out-of-bed"],
    description:
      "A bedside monitor turns a set of intermittent spot checks into a continuous picture, which matters when a patient can deteriorate between one observation and the next. It tracks heart rhythm, oxygen saturation, blood pressure, respiration and temperature, and alarms when any of them leaves the range set for that patient. The important word is *set*: factory default limits alarm constantly on a home patient, the family mutes the monitor, and a muted monitor is worse than no monitor at all. We configure the limits to the treating doctor's instructions at installation.",
    indications: [
      "Home ICU and high-dependency care",
      "Post-operative monitoring after discharge",
      "Patients on continuous oxygen or non-invasive ventilation",
      "Any patient at risk of unrecognised overnight deterioration",
    ],
    audience: [
      "Home ICU setups with trained nursing cover",
      "Nursing homes and step-down facilities",
      "Clinics and day-care units",
    ],
    brandsAvailable: ["Contec", "Niscomed", "BPL Medical", "Schiller"],
    specifications: [
      { label: "Parameters", value: "ECG, SpO₂, NIBP, respiration, temperature; etCO₂ on 7-para models" },
      { label: "Display", value: "10.1\" or 12.1\" colour TFT, multi-trace" },
      { label: "Alarms", value: "Configurable upper and lower limits on every parameter", note: "Set to the treating doctor's numbers at installation, not left on defaults." },
      { label: "Trend storage", value: "Up to 120 hours of tabular and graphical trend" },
      { label: "Battery", value: "2–4 hours internal backup" },
      { label: "Accessories", value: "ECG leads, SpO₂ finger probe, adult NIBP cuff, temperature probe" },
    ],
    dimensions: { width: "300 mm", height: "260 mm", length: "160 mm", weight: "Approximately 4.5 kg" },
    alsoKnowAbout: [
      { label: "A monitor does not treat anyone", value: "It reports. Without a trained attendant who can interpret a falling saturation and act on it, a monitor mostly generates anxiety. If nobody trained will be present, a pulse oximeter and clear escalation instructions are the better purchase." },
      { label: "Alarm fatigue is the real risk", value: "Badly set limits alarm all night, the family mutes them, and the one genuine event is missed. This is the commonest way home monitoring fails, and it is entirely a configuration problem." },
      { label: "Probes are consumables", value: "SpO₂ finger probes degrade after four to six months of continuous use and start reading low, which triggers false alarms." },
      { label: "Rotate the sensor sites", value: "Electrodes, probes and cuffs left in one position cause skin irritation and pressure marks, particularly on frail skin." },
    ],
    faqs: [
      { question: "Do I need a patient monitor at home?", answer: "Only if someone trained will be present to act on it. A monitor reports; it does not treat. For families without nursing cover, a pulse oximeter plus clear instructions on when to call is usually more useful and far less stressful." },
      { question: "What do the alarm limits need to be set to?", answer: "Whatever the treating doctor specifies for that patient. Factory defaults are set for a general hospital population and alarm almost continuously on a stable home patient, which leads to the alarms being ignored." },
      { question: "Can I rent a patient monitor?", answer: "Yes. Monitors are among the most commonly rented items, because the need usually spans weeks rather than years. Call us for a quote." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "Patient_Monitor.jpg", "Multi-parameter bedside patient monitor displaying ECG, SpO2 and blood pressure traces")],
    availability: DELHI,
    relatedSlugs: ["cardiac-monitor", "multi-parameter-monitor", "icu-setup-at-home", "icu-bed"],
    badges: ["sanitised", "technician-installed"],
    cdscoClass: "C",
    medical: profile("monitor"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "cardiac-monitor",
    name: "Cardiac Monitor",
    summary:
      "ECG-focused bedside monitor with arrhythmia detection and ST-segment analysis for patients under cardiac observation at home.",
    categorySlug: "patient-monitors",
    useCaseSlugs: ["critical-care-at-home", "elderly-daily-care"],
    description:
      "A cardiac monitor is a bedside monitor weighted towards the heart: more ECG leads, arrhythmia detection, and ST-segment analysis for ischaemic change. It suits patients discharged after a cardiac event, patients on antiarrhythmic drugs being observed, and anyone whose main risk overnight is rhythm rather than breathing. As with any monitor, its value depends entirely on someone being there to act on what it shows, and on the alarm limits being set for this patient rather than left on defaults.",
    indications: [
      "Recovery at home after a cardiac event or procedure",
      "Known arrhythmia under observation",
      "Patients on antiarrhythmic or rate-control medication",
      "Cardiac patients in home high-dependency care",
    ],
    audience: [
      "Cardiac patients discharged on continued observation",
      "Home ICU setups with nursing cover",
      "Cardiology day-care units and nursing homes",
    ],
    brandsAvailable: ["BPL Medical", "Schiller", "Contec", "Nihon Kohden"],
    specifications: [
      { label: "ECG", value: "3, 5 or 12-lead depending on model" },
      { label: "Analysis", value: "Arrhythmia detection and ST-segment analysis" },
      { label: "Other parameters", value: "SpO₂, NIBP, respiration, temperature" },
      { label: "Display", value: "12.1\" colour TFT, multi-trace" },
      { label: "Alarms", value: "Configurable rate, rhythm and saturation limits" },
      { label: "Trend storage", value: "Up to 120 hours, with alarm event capture" },
      { label: "Battery", value: "2–4 hours internal backup" },
    ],
    dimensions: { width: "320 mm", height: "270 mm", length: "165 mm", weight: "Approximately 5 kg" },
    alsoKnowAbout: [
      { label: "Artefact looks like arrhythmia", value: "Movement, dry electrode gel and loose leads all produce traces that read as rhythm abnormalities. Whoever is watching needs to be able to tell the difference, or every turn in bed becomes an emergency." },
      { label: "Electrodes are consumables", value: "ECG electrodes dry out. Once the gel goes, contact degrades and false alarms multiply — replace them on schedule rather than when they fall off." },
      { label: "Alarm limits are patient-specific", value: "A rate limit appropriate for one cardiac patient is wrong for the next. These come from the treating cardiologist and get revisited when medication changes." },
      { label: "Not a defibrillator", value: "The monitor detects; it does not treat. Emergency response planning — who to call, where the nearest cardiac facility is — matters more than the monitor itself." },
    ],
    faqs: [
      { question: "What is the difference between a cardiac monitor and a patient monitor?", answer: "A cardiac monitor weights the ECG side more heavily — more leads, arrhythmia detection, ST-segment analysis. A general patient monitor covers the same core vitals but without the rhythm analysis depth. If the primary concern is the heart, the cardiac monitor is the right one." },
      { question: "Can a cardiac monitor be used at home?", answer: "Yes, with trained nursing cover and alarm limits set by the treating cardiologist. Without someone who can distinguish a genuine arrhythmia from movement artefact, it produces more alarm than information." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "Cardiac_Monitor.jpg", "Cardiac bedside monitor showing multi-lead ECG traces and arrhythmia analysis")],
    availability: DELHI,
    relatedSlugs: ["patient-monitor", "multi-parameter-monitor", "icu-setup-at-home"],
    badges: ["sanitised", "technician-installed"],
    cdscoClass: "C",
    medical: profile("monitor", {
      specialties: ["Cardiovascular", "Nursing", "Emergency"],
      adverseOutcomes: [
        { name: "Artefact misread as arrhythmia", description: "Movement and poor electrode contact generate traces that mimic rhythm abnormalities, prompting unnecessary escalation — or, worse, teaching the carer to discount real events." },
      ],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "suction-machine",
    name: "Suction Machine",
    summary:
      "Mains-powered surgical suction unit with adjustable vacuum regulator and autoclavable collection jars, for airway clearance in tracheostomy and bedbound patients.",
    categorySlug: "suction",
    useCaseSlugs: ["critical-care-at-home", "cannot-get-out-of-bed"],
    description:
      "A suction machine clears secretions a patient cannot clear themselves. For someone with a tracheostomy, a weak cough after a stroke, or advanced neuromuscular disease, this is not comfort equipment — retained secretions become pneumonia within days. The unit is simple: a vacuum pump, a regulator to set the pressure, and a jar that catches what comes out. What is not simple is the technique, and getting it wrong causes bleeding and hypoxia. We set the pressure to the clinician's number and take the carer through a full pass before leaving.",
    indications: [
      "Tracheostomy care at home",
      "Weak or absent cough after stroke or neuromuscular disease",
      "Bedbound patients with retained secretions",
      "Home ICU and palliative care",
    ],
    audience: [
      "Families caring for a tracheostomised patient",
      "Home ICU setups with trained attendant cover",
      "Nursing homes and clinics",
    ],
    brandsAvailable: ["Allied Healthcare", "Niscomed", "Devilbiss", "Assorted OEM"],
    specifications: [
      { label: "Vacuum range", value: "0–760 mmHg, adjustable" },
      { label: "Flow rate", value: "Approximately 40–60 L/min" },
      { label: "Collection jars", value: "2 × 1000 ml, autoclavable, with overflow protection" },
      { label: "Power", value: "Mains, approximately 130 W" },
      { label: "Regulator", value: "Dial with gauge", note: "Pressure is set to the treating clinician's specification, not to maximum." },
      { label: "Filter", value: "Bacterial filter between jar and pump" },
    ],
    dimensions: { width: "360 mm", height: "330 mm", length: "260 mm", weight: "Approximately 6 kg" },
    alsoKnowAbout: [
      { label: "Technique matters more than the machine", value: "Suction is applied on withdrawal only, never on insertion, and a pass should not exceed ten to fifteen seconds. Longer passes remove air along with secretions and desaturate the patient." },
      { label: "Pressure is prescribed", value: "Turning the regulator to maximum strips the airway lining and causes bleeding. The correct pressure varies by patient and by whether the airway is native or tracheostomised." },
      { label: "The jar is an infection route", value: "Empty and disinfect after every use. A jar left standing is a bacterial culture connected directly to the patient's airway." },
      { label: "You need a backup plan for power cuts", value: "A mains suction unit stops with the power. For a patient who needs frequent suction, a portable battery unit alongside it is not optional." },
    ],
    faqs: [
      { question: "How often should a tracheostomy patient be suctioned?", answer: "As often as secretions require and no more — the treating clinician sets this. Routine suctioning on a fixed schedule causes unnecessary mucosal trauma; suctioning too rarely allows secretions to accumulate and lead to infection." },
      { question: "What suction pressure should I use?", answer: "Whatever the treating clinician specifies. It varies with the patient and the airway, and higher is not better — excess pressure damages the airway lining." },
      { question: "Do I need a portable suction machine as well?", answer: "If the patient needs frequent suction, yes. A mains unit stops during a power cut, which for a secretion-loaded patient is an emergency rather than an inconvenience." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "Suction_Machine.jpg", "Mains-powered surgical suction machine with twin collection jars and vacuum regulator")],
    availability: DELHI,
    relatedSlugs: ["portable-suction-machine", "icu-setup-at-home", "oxygen-concentrator"],
    badges: ["sanitised", "technician-installed"],
    cdscoClass: "B",
    medical: profile("suction"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "dvt-pump",
    name: "DVT Pump",
    summary:
      "Intermittent pneumatic compression pump with calf or thigh sleeves, for deep vein thrombosis prophylaxis in immobile patients.",
    categorySlug: "pumps",
    useCaseSlugs: ["cannot-get-out-of-bed", "post-surgery-recovery", "critical-care-at-home"],
    description:
      "When someone stops walking, the calf muscles stop pumping blood back up the legs, and blood that sits still clots. A DVT pump substitutes for the muscle: sleeves wrap the calves or thighs and inflate in a rolling sequence, squeezing blood upward, then deflate to let the veins refill. It is prophylaxis, not treatment — it exists to stop a clot forming in a patient who is bedbound after surgery, after a stroke, or through long-term immobility. Where a clot is already suspected, it must not be used until that is ruled out.",
    indications: [
      "DVT prophylaxis in bedbound or post-operative patients",
      "Immobility after orthopaedic or abdominal surgery",
      "Stroke and neurological patients with limb immobility",
      "Patients in whom anticoagulation is contraindicated",
    ],
    audience: [
      "Post-operative patients recovering at home",
      "Families caring for a long-term bedbound relative",
      "Nursing homes and post-surgical facilities",
    ],
    brandsAvailable: ["Arjo", "Niscomed", "Bio Medical", "Assorted OEM"],
    specifications: [
      { label: "Mode", value: "Sequential intermittent pneumatic compression" },
      { label: "Pressure range", value: "20–80 mmHg, adjustable" },
      { label: "Cycle", value: "Adjustable inflation and deflation intervals" },
      { label: "Sleeves", value: "Calf or full-leg, washable, in multiple sizes", note: "Sizing matters — an oversized sleeve does not compress and an undersized one restricts." },
      { label: "Chambers", value: "3 or 4 per sleeve, inflating in sequence" },
      { label: "Power", value: "Mains, approximately 40 W" },
    ],
    dimensions: { width: "280 mm", height: "200 mm", length: "180 mm", weight: "Approximately 3.5 kg" },
    alsoKnowAbout: [
      { label: "Not for use over a suspected clot", value: "If a DVT is already suspected or confirmed, compression can dislodge it. This must be ruled out by the treating clinician before the pump goes on." },
      { label: "Check the skin under the sleeves", value: "Sleeves worn continuously trap heat and moisture. Remove them at least twice a day and check for redness, particularly over the shin and ankle bones." },
      { label: "It complements movement, it does not replace it", value: "Where the patient can be helped to move their legs at all, that remains the better prophylaxis. The pump is for when they cannot." },
      { label: "Sizing is not cosmetic", value: "A sleeve that does not fit does not deliver the pressure it reads. Measure the limb rather than guessing from the patient's build." },
    ],
    faqs: [
      { question: "What does a DVT pump do?", answer: "It inflates sleeves around the legs in sequence to push venous blood back toward the heart, replacing the pumping action of the calf muscles in someone who cannot walk. It prevents clots forming; it does not treat one that already exists." },
      { question: "Can a DVT pump be used if a clot is already suspected?", answer: "No. Compression over an existing clot can dislodge it, which is dangerous. The treating clinician must rule out a DVT before the pump is used." },
      { question: "How many hours a day should it run?", answer: "As directed by the treating clinician — commonly most of the day while the patient is immobile, with breaks to inspect the skin. It is not left on continuously without checks." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "DVT_Pump.jpg", "Intermittent pneumatic compression DVT pump with sequential leg sleeves")],
    availability: DELHI,
    relatedSlugs: ["air-bed", "hospital-bed", "icu-setup-at-home"],
    badges: ["sanitised", "same-day-delivery"],
    cdscoClass: "B",
    medical: profile("pump", {
      procedure:
        "The technician measures the limb, selects the correct sleeve size, fits the sleeves with two fingers' clearance, sets the pressure and cycle to the clinician's specification, runs a full inflation sequence, and shows the carer how to check the skin underneath.",
      preOp:
        "An existing or suspected deep vein thrombosis must be ruled out by the treating clinician before compression is applied. Confirm limb circumference so the sleeve is sized rather than guessed.",
      postOp:
        "Remove the sleeves at least twice daily and inspect the skin over the shin, ankle and heel. Sleeves are washable and should be laundered on the clinician's schedule.",
      contraindications: [
        { name: "Suspected or confirmed deep vein thrombosis", description: "Compression over an existing clot can dislodge it and cause a pulmonary embolism. This must be excluded first." },
        { name: "Acute limb infection, ulceration or fresh skin graft", description: "Compression over infected, ulcerated or recently grafted skin damages the tissue and spreads infection." },
        { name: "Severe peripheral arterial disease", description: "Where arterial supply is already compromised, external compression can worsen limb ischaemia." },
      ],
      adverseOutcomes: [
        { name: "Skin breakdown under the sleeves", description: "Trapped heat and moisture, especially over bony points, cause redness and pressure damage if the sleeves are never removed." },
        { name: "Pulmonary embolism from a dislodged clot", description: "If compression is applied over an undiagnosed DVT, a fragment can travel to the lungs — an immediately life-threatening event.", serious: true },
      ],
      specialties: ["Nursing", "Musculoskeletal", "Cardiovascular"],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "wheelchair",
    name: "Wheelchair",
    summary:
      "Standard and folding manual wheelchairs with attendant brakes, footrests and removable arm rests — sized to the user rather than sold one-size-fits-all.",
    categorySlug: "wheelchairs",
    useCaseSlugs: ["elderly-daily-care", "post-surgery-recovery", "cannot-get-out-of-bed"],
    description:
      "A wheelchair is the difference between a patient who leaves the room and one who does not, and that difference shows up in mood and recovery as much as in logistics. The manual folding chair covers most needs: hospital visits, moving between rooms, sitting out of bed for a few hours. The two questions that actually determine which chair is right are whether the user will push themselves or be pushed, and how long they will sit in it at a stretch. Both change the answer, and neither is on a spec sheet.",
    indications: [
      "Reduced mobility after surgery, fracture or stroke",
      "Elderly patients who tire over distance",
      "Transfers between bed, bathroom and living areas",
      "Hospital and clinic visits",
    ],
    audience: [
      "Elderly patients and their families",
      "Post-operative patients during recovery",
      "Nursing homes, clinics and hospitals",
    ],
    brandsAvailable: ["Karma", "Vissco", "Ostrich Mobility", "Assorted OEM"],
    specifications: [
      { label: "Type", value: "Folding manual, self-propelling or attendant-propelled" },
      { label: "Seat width", value: "440–460 mm standard; other sizes to order", note: "Seat width should be about 25 mm wider than the user's hips — no more." },
      { label: "Rear wheels", value: "600 mm pneumatic or solid" },
      { label: "Brakes", value: "Push-to-lock wheel brakes; attendant brakes on request" },
      { label: "Arm rests", value: "Removable, for side transfers from a bed" },
      { label: "Footrests", value: "Swing-away and detachable, height-adjustable" },
      { label: "Frame", value: "Powder-coated steel or aluminium alloy" },
    ],
    dimensions: { width: "640 mm open; 300 mm folded", length: "1050 mm", height: "900 mm", weight: "14–18 kg depending on frame", loadCapacity: "115 kg" },
    alsoKnowAbout: [
      { label: "The cushion is not a pressure cushion", value: "The supplied seat pad is comfort padding. Anyone sitting for several hours a day needs a gel or air pressure-relieving cushion, or they will develop sores on the sitting bones." },
      { label: "Seat width is not 'bigger is better'", value: "Too wide and the user slides and loses posture; too narrow and it rubs. Measure the hips and add about 25 mm." },
      { label: "Pneumatic tyres need pumping", value: "Air-filled tyres roll better and absorb kerbs, but they go soft. Solid tyres are harsher and maintenance-free — worth choosing deliberately." },
      { label: "Kerbs and slopes are where accidents happen", value: "Tipping the chair back at a kerb, or letting go on a slope, is how users get thrown out. The attendant needs showing once, properly." },
    ],
    faqs: [
      { question: "Which wheelchair should I choose for an elderly parent?", answer: "If they can push themselves, a lightweight self-propelling chair keeps them independent. If they will always be pushed, an attendant chair with attendant brakes is lighter and easier to handle. If they will sit in it for hours, prioritise a pressure-relieving cushion over the frame." },
      { question: "Can I rent a wheelchair for a few weeks?", answer: "Yes, and it is the usual choice for post-surgical recovery. Call us for a quote covering your expected period." },
      { question: "How do I know what seat width to order?", answer: "Measure across the user's hips while seated and add roughly 25 mm. Too wide is as much of a problem as too narrow — it lets the user slide sideways and lose posture." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "Wheelchair.jpg", "Folding manual wheelchair with removable arm rests and swing-away footrests")],
    availability: DELHI,
    relatedSlugs: ["recliner-wheelchair", "electric-wheelchair", "hospital-bed"],
    badges: ["bestseller", "sanitised", "same-day-delivery"],
    cdscoClass: "A",
    medical: profile("mobility"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "icu-setup-at-home",
    name: "ICU Setup at Home",
    summary:
      "A commissioned home critical-care package — ICU bed, air mattress, patient monitor, oxygen source and suction — installed and configured together in one visit.",
    categorySlug: "icu-setup",
    useCaseSlugs: ["critical-care-at-home", "cannot-get-out-of-bed"],
    description:
      "Assembling a home ICU one item at a time is how families end up at 2 AM discovering the suction catheters are the wrong size for the tracheostomy, or that the monitor is alarming on defaults nobody set. This is the same equipment, commissioned as a system: bed, alternating-pressure mattress, multi-para monitor, oxygen source and suction unit, delivered together, configured to the treating doctor's numbers, and handed over device by device to whoever will be doing the caring. It takes three to four hours and it is the difference between having equipment and having a working setup.",
    indications: [
      "Discharge home on long-term critical or high-dependency care",
      "Ventilated, tracheostomised or unconscious patients",
      "Advanced neurological disease requiring continuous support",
      "Palliative care at home where hospital transfer is not wanted",
    ],
    audience: [
      "Families bringing a critically ill relative home",
      "Patients under long-term specialist care at home",
      "Facilities setting up a high-dependency room",
    ],
    brandsAvailable: ["Assembled from the brands stocked for each component"],
    specifications: [
      { label: "Bed", value: "Five-function motorised ICU bed with CPR release" },
      { label: "Mattress", value: "Alternating-pressure air mattress with pump" },
      { label: "Monitor", value: "Multi-para bedside monitor, alarm limits configured on site" },
      { label: "Oxygen", value: "Concentrator or cylinder, per the prescribed flow" },
      { label: "Suction", value: "Surgical suction unit with correctly sized catheters" },
      { label: "Installation", value: "Single visit, approximately 3–4 hours including handover" },
      { label: "Support", value: "24×7 breakdown replacement within the service area", note: "We dispatch a replacement unit rather than scheduling a repair." },
    ],
    dimensions: { extra: [{ label: "Room required", value: "Minimum 3.0 m × 2.5 m with access on both sides of the bed" }, { label: "Power required", value: "Two 16 A sockets on separate circuits, plus an inverter rated for a continuous 1.5 kW load" }] },
    alsoKnowAbout: [
      { label: "Equipment is the smaller half", value: "A home ICU without trained hands present is not a home ICU. Encone Care provides the nursing; if you have not arranged it, arrange it before the equipment arrives." },
      { label: "Power backup is not optional", value: "Concentrator, monitor and suction all stop when mains power fails. For a dependent patient that is an emergency, and a domestic inverter is usually undersized for the load." },
      { label: "No ventilator in this package", value: "Invasive ventilation requires separate clinical assessment and a respiratory therapist handover. Ask us and we will arrange it as a separate line." },
      { label: "Alarm limits get set once, then revisited", value: "The numbers configured at installation reflect the patient's condition that day. When the condition changes, the limits need changing with it." },
    ],
    faqs: [
      { question: "What equipment is needed for an ICU setup at home?", answer: "At minimum: an ICU bed, an alternating-pressure mattress, a multi-para monitor, an oxygen source and a suction unit. Ventilation, infusion pumps and DVT prophylaxis are added according to the patient's condition. Trained nursing cover is not optional." },
      { question: "How long does a home ICU installation take?", answer: "Three to four hours in a single visit, including assembly, configuration of alarm limits and oxygen flow to the treating doctor's instructions, and a device-by-device handover to the carer." },
      { question: "What happens if something fails at night?", answer: "Breakdown replacement runs 24×7 within the service area. We dispatch a replacement unit rather than scheduling a repair, because a patient on continuous oxygen or suction cannot wait for a service appointment." },
      { question: "Can I rent a complete home ICU setup?", answer: "Yes — this package is most commonly taken on rental, since the need usually spans months rather than years. Call us and we will quote for the configuration your patient actually needs." },
    ],
    offerMode: "rent-or-buy",
    images: [img("rental", "ICU_Setup_At_Home.jpg", "Complete home ICU setup with ICU bed, patient monitor, oxygen concentrator and suction unit")],
    availability: DELHI,
    relatedSlugs: ["icu-bed", "patient-monitor", "oxygen-concentrator", "suction-machine"],
    badges: ["technician-installed", "sanitised", "new"],
    cdscoClass: "unclassified",
    medical: profile("icuSetup"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  /* ================================================================== */
  /*  SALE ONLY                                                          */
  /* ================================================================== */

  {
    slug: "electric-hospital-bed",
    name: "Electric Hospital Bed",
    summary:
      "Motorised three-function hospital bed with handset control for backrest, knee-rest and height — for long-term home care where the bed is adjusted many times a day.",
    categorySlug: "hospital-beds",
    useCaseSlugs: ["cannot-get-out-of-bed", "elderly-daily-care", "critical-care-at-home"],
    description:
      "The case for an electric bed is not luxury, it is repetition. Where the head of the bed goes up and down a dozen times a day — for meals, for reflux, for breathlessness, for washing — a manual crank turns into twenty minutes of work spread across every day, usually done by someone who is already exhausted. A handset removes that, and it lets a patient with working hands adjust themselves without calling anyone. Height adjustment brings the platform to the carer's waist for washing and changing, which is the single biggest protection against carer back injury.",
    indications: [
      "Long-term home care for a bedbound patient",
      "Patients who need frequent backrest adjustment for breathing or feeding",
      "Households where the carer is elderly or has back problems",
      "Patients able to reposition themselves given a handset",
    ],
    audience: [
      "Families in long-term home care arrangements",
      "Nursing homes and assisted living facilities",
      "Patients with chronic conditions needing daily positioning",
    ],
    brandsAvailable: ["Hospiline", "Godrej Interio", "Surgihub", "Assorted OEM"],
    specifications: [
      { label: "Functions", value: "3 motorised — backrest, knee-rest, height" },
      { label: "Operation", value: "Handset with lockout; manual crank backup" },
      { label: "Backrest range", value: "0–75°" },
      { label: "Height range", value: "450–750 mm" },
      { label: "Side rails", value: "Collapsible, both sides" },
      { label: "Mattress", value: "Included — foam, waterproof cover" },
      { label: "Power", value: "Mains with battery backup for positioning" },
    ],
    dimensions: { length: "2080 mm", width: "950 mm", height: "450–750 mm", weight: "Approximately 95 kg assembled", loadCapacity: "200 kg including mattress" },
    alsoKnowAbout: [
      { label: "Sale only", value: "The rental fleet carries the manual hospital bed and the ICU bed. This one is available to buy — if you need an electric bed short-term, ask us and we will tell you what the rental fleet can do instead." },
      { label: "Handset lockout matters", value: "A confused or agitated patient will press buttons. The lockout exists so they cannot put themselves in an unsafe position; use it." },
      { label: "Still needs a pressure mattress", value: "The included foam mattress is a sleeping surface. Continuously bedbound patients need an alternating-pressure overlay on top." },
      { label: "Mind the cable", value: "The mains lead is a trip hazard in a room where carers move at night. Route it along the wall at installation, not across the floor." },
    ],
    faqs: [
      { question: "Is an electric hospital bed worth it over a manual one?", answer: "It is worth it when the bed is adjusted many times a day, when the carer is elderly or has back trouble, or when the patient can operate the handset themselves. For a stable patient whose position rarely changes, a manual bed does the same clinical job." },
      { question: "Does an electric bed work during a power cut?", answer: "There is a battery backup for repositioning and a manual crank as a fallback, so the bed can still be moved. It does not power anything else in the room." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Electric_Hospital_Bed.jpg", "Motorised three-function electric hospital bed with handset control")],
    availability: DELHI,
    relatedSlugs: ["hospital-bed", "five-function-electric-icu-bed", "recliner-motorized-bed", "air-bed"],
    badges: ["sanitised", "technician-installed"],
    cdscoClass: "A",
    medical: profile("bed"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "five-function-electric-icu-bed",
    name: "5-Function Electric ICU Bed",
    summary:
      "Fully motorised ICU bed with backrest, knee-rest, height, Trendelenburg and reverse-Trendelenburg, mechanical CPR release and radiolucent platform.",
    categorySlug: "hospital-beds",
    useCaseSlugs: ["critical-care-at-home", "cannot-get-out-of-bed"],
    description:
      "The full-specification critical care bed, for purchase. All five functions run off a lockable handset, the platform is radiolucent so a bedside X-ray does not require moving the patient, and the mechanical CPR release drops the backrest flat in one pull. Facilities buy this bed; families generally rent the equivalent unless the need is measured in years. If you are setting up a permanent high-dependency room, this is the bed that setup is built around.",
    indications: [
      "Permanent high-dependency or critical care rooms",
      "Long-term ventilated or unconscious patients",
      "Facilities requiring bedside imaging without patient transfer",
    ],
    audience: ["Hospitals, nursing homes and critical care facilities", "Families establishing long-term home critical care"],
    brandsAvailable: ["Hospiline", "Narang Medical", "Surgihub", "Assorted OEM"],
    specifications: [
      { label: "Functions", value: "5 motorised — backrest, knee-rest, height, Trendelenburg, reverse" },
      { label: "CPR release", value: "Mechanical, single-pull" },
      { label: "Tilt range", value: "±12°" },
      { label: "Platform", value: "Four-section radiolucent with X-ray cassette channel" },
      { label: "Side rails", value: "Polymer, collapsible, full length" },
      { label: "Castors", value: "125 mm with central locking" },
      { label: "Backup", value: "Internal battery for positioning" },
    ],
    dimensions: { length: "2150 mm", width: "990 mm", height: "450–800 mm", weight: "Approximately 135 kg", loadCapacity: "250 kg including mattress" },
    alsoKnowAbout: [
      { label: "Sale only", value: "For a temporary need, the rental fleet carries an equivalent ICU bed. Ask us before buying if the requirement might be measured in months." },
      { label: "Lift access is a hard requirement", value: "At 135 kg this bed does not go up stairs above the third floor. We will decline rather than attempt it." },
      { label: "Tilt is clinician-directed", value: "Trendelenburg is contraindicated in raised intracranial pressure and raises aspiration risk. Agree the available positions with the treating doctor." },
      { label: "Test the CPR release at handover", value: "It is the one control that must work first time under pressure, and the one most likely to be obstructed by bedding or a mattress that does not fit." },
    ],
    faqs: [
      { question: "What are the five functions on an ICU bed?", answer: "Backrest, knee-rest, height, Trendelenburg (head-down tilt) and reverse-Trendelenburg (head-up tilt). The tilt functions are what distinguish an ICU bed from a standard three-function electric bed." },
      { question: "Should I buy or rent an ICU bed?", answer: "Facilities normally buy. Families normally rent, because the need is usually months rather than years. Tell us the expected duration and we will quote for whichever genuinely works out better." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "5_Function_Electric_ICU_Bed.jpg", "Five-function electric ICU bed with tilt functions and radiolucent platform")],
    availability: DELHI,
    relatedSlugs: ["icu-bed", "manual-icu-bed", "electric-hospital-bed", "icu-setup-at-home"],
    badges: ["technician-installed", "sanitised"],
    cdscoClass: "A",
    medical: profile("bed", {
      contraindications: [
        { name: "Trendelenburg in raised intracranial pressure", description: "Head-down tilt is contraindicated where intracranial pressure is raised, and must be directed by the treating clinician." },
        { name: "No lift access above the third floor", description: "At 135 kg the bed cannot be carried safely up more than three floors without a service lift." },
      ],
      adverseOutcomes: [
        { name: "Delayed resuscitation from CPR release failure", description: "An obstructed or untested CPR release prevents the backrest dropping flat quickly enough for effective chest compressions.", serious: true },
        { name: "Aspiration in head-down tilt", description: "Prolonged or unsupervised Trendelenburg positioning can cause aspiration of gastric contents.", serious: true },
      ],
      specialties: ["Nursing", "Emergency", "Neurologic"],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "manual-icu-bed",
    name: "Manual ICU Bed",
    summary:
      "Crank-operated ICU bed with five positions including Trendelenburg tilt and a mechanical CPR release — full ICU capability without dependence on power.",
    categorySlug: "hospital-beds",
    useCaseSlugs: ["critical-care-at-home", "cannot-get-out-of-bed"],
    description:
      "A manual ICU bed reaches the same positions as its motorised counterpart — including both tilts — using crank handles rather than motors. That makes it cheaper and, more usefully, entirely independent of the power supply, which matters in facilities where outages are routine. The trade-off is effort: reaching a tilt position by crank takes real work, so it suits settings where positions are set and held rather than adjusted through the day.",
    indications: [
      "Critical care in facilities with unreliable power",
      "High-dependency care where positions are set rather than frequently changed",
      "Budget-constrained facility expansion",
    ],
    audience: ["Nursing homes and small hospitals", "Facilities in areas with frequent power interruption"],
    brandsAvailable: ["Hospiline", "Narang Medical", "Assorted OEM"],
    specifications: [
      { label: "Functions", value: "5 manual — backrest, knee-rest, height, Trendelenburg, reverse" },
      { label: "Operation", value: "Crank handles, foot end" },
      { label: "CPR release", value: "Mechanical, single-pull" },
      { label: "Tilt range", value: "±12°" },
      { label: "Platform", value: "Four-section, radiolucent options available" },
      { label: "Side rails", value: "Collapsible, full length" },
    ],
    dimensions: { length: "2150 mm", width: "980 mm", height: "500–780 mm", weight: "Approximately 120 kg", loadCapacity: "230 kg including mattress" },
    alsoKnowAbout: [
      { label: "Sale only", value: "Rental stock carries the motorised ICU bed instead. Ask us if the need is temporary." },
      { label: "Cranking to tilt is hard work", value: "Reaching a tilt position by hand takes considerable effort. If positions change often through the day, the motorised bed is the realistic choice." },
      { label: "Independent of power", value: "This is its genuine advantage. In a facility with frequent outages, a bed that works regardless is worth more than one that adjusts faster." },
      { label: "Still needs a pressure mattress", value: "As with any bed frame, pressure ulcer prevention comes from the mattress and the turning schedule, not the bed." },
    ],
    faqs: [
      { question: "Why choose a manual ICU bed over an electric one?", answer: "Lower cost and complete independence from the power supply. The trade-off is effort — reaching a tilt position by crank is genuinely hard work, so it suits settings where positions are set and held rather than adjusted constantly." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Manual_ICU_Beds.jpg", "Manual crank-operated ICU bed with tilt functions and collapsible side rails")],
    availability: DELHI,
    relatedSlugs: ["five-function-electric-icu-bed", "icu-bed", "hospital-fowler-bed"],
    badges: ["sanitised", "technician-installed"],
    cdscoClass: "A",
    medical: profile("bed", {
      specialties: ["Nursing", "Emergency", "Geriatric"],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "hospital-fowler-bed",
    name: "Hospital Fowler Bed",
    summary:
      "Two-function Fowler bed with crank-adjusted backrest and knee-rest — the standard general-ward bed for facilities and straightforward home care.",
    categorySlug: "hospital-beds",
    useCaseSlugs: ["post-surgery-recovery", "elderly-daily-care", "cannot-get-out-of-bed"],
    description:
      "The Fowler bed is the plain, durable ward bed: a backrest and a knee-rest on crank handles, side rails, castors, and nothing else to go wrong. Named for the Fowler's position it puts the patient into — sitting up at roughly 45 to 60 degrees — which eases breathing, reduces reflux and makes feeding safer. For general wards, for recovery rooms, and for home care where the patient is stable, it does the necessary job at the lowest cost and with the least maintenance.",
    indications: [
      "General ward and recovery-room use",
      "Home care for a stable patient needing backrest elevation",
      "Post-operative recovery",
      "Patients who need to be sat up for feeding or breathing",
    ],
    audience: ["Hospitals, nursing homes and clinics", "Families needing a straightforward, durable home care bed"],
    brandsAvailable: ["Hospiline", "Godrej Interio", "Narang Medical", "Assorted OEM"],
    specifications: [
      { label: "Functions", value: "2 manual — backrest and knee-rest" },
      { label: "Operation", value: "Crank handles, foot end" },
      { label: "Backrest range", value: "0–70°" },
      { label: "Side rails", value: "Collapsible steel, both sides" },
      { label: "Castors", value: "100 mm, two with brakes" },
      { label: "Frame", value: "Powder-coated mild steel, ABS head and foot boards" },
    ],
    dimensions: { length: "2050 mm", width: "900 mm", height: "600 mm fixed", weight: "Approximately 70 kg", loadCapacity: "180 kg including mattress" },
    alsoKnowAbout: [
      { label: "Sale only", value: "The rental fleet carries the equivalent manual hospital bed. Ask us if the need is short-term." },
      { label: "Fixed height", value: "Unlike a three-function bed, the platform height does not adjust. At 600 mm it suits most carers, but it will not come down for a patient transferring themselves or up for a tall carer." },
      { label: "Mattress is a sleeping surface", value: "Pressure ulcer prevention still needs an alternating-pressure overlay for anyone continuously bedbound." },
      { label: "Simple is a feature", value: "No motors, no handset, no battery. In a facility running many beds, that means fewer things needing service." },
    ],
    faqs: [
      { question: "What is a Fowler bed?", answer: "A hospital bed whose backrest raises the patient into Fowler's position — sitting up at roughly 45 to 60 degrees — which eases breathing, reduces reflux and makes feeding safer. The two-function version adjusts backrest and knee-rest by crank." },
      { question: "What is the difference between a Fowler bed and a semi-Fowler bed?", answer: "The terms describe the angle rather than the bed. Fowler's position is roughly 45–60°; semi-Fowler is roughly 30–45°. Both are reachable on the same two-function bed." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Hospital_Fowler_Bed.jpg", "Two-function hospital Fowler bed with crank-adjusted backrest and side rails")],
    availability: DELHI,
    relatedSlugs: ["hospital-bed", "electric-hospital-bed", "manual-icu-bed", "hospital-furniture"],
    badges: ["sanitised", "same-day-delivery"],
    cdscoClass: "A",
    medical: profile("bed"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "recliner-motorized-bed",
    name: "Recliner Motorised Bed",
    summary:
      "Motorised recliner bed that raises the patient toward a seated position for feeding, reading and transfers — for long-term care where dignity and independence matter.",
    categorySlug: "hospital-beds",
    useCaseSlugs: ["elderly-daily-care", "cannot-get-out-of-bed"],
    description:
      "A recliner bed sits between a hospital bed and an armchair. It raises the patient close to a seated position — far enough forward that they can eat at a table, read, hold a conversation at eye level, or swing their legs to the edge for a transfer. For someone in long-term care who is not acutely unwell but cannot get out of bed unaided, that changes the shape of the day. It is bought for quality of life rather than for clinical capability, and that is a legitimate reason to buy equipment.",
    indications: [
      "Long-term care for a patient who cannot rise unaided",
      "Patients who eat, read or receive visitors in bed",
      "Assisted transfers to a chair or wheelchair",
      "Elderly care where independence is a goal",
    ],
    audience: ["Families in long-term home care", "Assisted living and residential care facilities"],
    brandsAvailable: ["Hospiline", "Godrej Interio", "Assorted OEM"],
    specifications: [
      { label: "Functions", value: "Motorised recline, leg elevation and height" },
      { label: "Recline range", value: "Flat to approximately 85°" },
      { label: "Operation", value: "Handset with lockout" },
      { label: "Side rails", value: "Collapsible, both sides" },
      { label: "Mattress", value: "Sectioned foam, waterproof cover" },
      { label: "Power", value: "Mains with battery backup for positioning" },
    ],
    dimensions: { length: "2050 mm", width: "950 mm", height: "450–720 mm", weight: "Approximately 105 kg", loadCapacity: "180 kg including mattress" },
    alsoKnowAbout: [
      { label: "Sale only", value: "Not carried on the rental fleet. If the need is temporary, the electric hospital bed reaches a similar seated angle." },
      { label: "Sitting up brings its own pressure risk", value: "Upright positions concentrate load on the sitting bones. A patient who spends hours reclined needs the same skin checks as one lying flat, in different places." },
      { label: "Change the angle slowly", value: "Moving from flat to near-seated quickly can cause dizziness or fainting, particularly in elderly patients on blood pressure medication." },
      { label: "It is not a transfer aid", value: "The bed brings the patient to the edge; it does not lift them out. Plan the transfer method separately." },
    ],
    faqs: [
      { question: "What is a recliner bed used for?", answer: "It raises a patient close to a seated position so they can eat, read, receive visitors at eye level, or bring their legs to the edge for an assisted transfer. It is bought for daily quality of life rather than for clinical capability." },
      { question: "Is a recliner bed suitable for a bedridden patient?", answer: "Yes, and it is one of the better purchases for long-term care — provided skin checks account for the upright position, which loads the sitting bones rather than the sacrum and heels." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Recliner_Motorized_Bed.jpg", "Motorised recliner bed raised toward a seated position with side rails")],
    availability: DELHI,
    relatedSlugs: ["electric-hospital-bed", "recliner-wheelchair", "air-bed", "hospital-bed"],
    badges: ["sanitised", "technician-installed", "new"],
    cdscoClass: "A",
    medical: profile("bed", {
      adverseOutcomes: [
        { name: "Postural hypotension on rapid recline change", description: "Moving from flat to near-seated quickly can cause dizziness or fainting, particularly in elderly patients on antihypertensives." },
        { name: "Pressure damage over the sitting bones", description: "Upright positions shift load from the sacrum and heels onto the ischial tuberosities. Skin checks have to follow the position." },
      ],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "air-bed",
    name: "Air Bed (Anti-Decubitus Mattress)",
    summary:
      "Alternating-pressure air mattress with pump — bubble and tubular types — to prevent and manage pressure sores in bedbound patients.",
    categorySlug: "pressure-care",
    useCaseSlugs: ["cannot-get-out-of-bed", "critical-care-at-home", "elderly-daily-care"],
    description:
      "An alternating-pressure mattress inflates and deflates its cells in rotation, so no area of skin carries the patient's weight continuously. That is the whole mechanism, and it is the single most effective piece of equipment you can add for a bedbound patient — a pressure ulcer that reaches muscle takes months to heal and frequently sends the patient back to hospital. Bubble type suits prevention in lighter patients; tubular type carries more weight and is used where sores have already started. Neither replaces turning the patient.",
    indications: [
      "Prevention of pressure ulcers in bedbound patients",
      "Management of existing grade 1 and 2 pressure sores",
      "Patients immobile more than 16 hours a day",
      "Palliative and long-term neurological care",
    ],
    audience: ["Families caring for a bedbound relative", "Nursing homes and long-term care facilities", "Home ICU setups"],
    brandsAvailable: ["Apex Medical", "Vissco", "Niscomed", "Assorted OEM"],
    specifications: [
      { label: "Types", value: "Bubble (cell) and tubular (strip)", note: "Tubular carries more weight and suits existing sores; bubble suits prevention." },
      { label: "Cycle time", value: "Approximately 10–12 minutes per full alternation" },
      { label: "Pump", value: "Adjustable pressure by patient weight, with static mode" },
      { label: "Static mode", value: "Freezes alternation for transfers and personal care" },
      { label: "Surface", value: "Waterproof, wipe-clean PVC or nylon" },
      { label: "Power", value: "Mains, approximately 12 W" },
    ],
    dimensions: { length: "2000 mm", width: "900 mm", weight: "Approximately 6 kg with pump", loadCapacity: "Approximately 135 kg" },
    alsoKnowAbout: [
      { label: "It goes on top of the mattress, never instead of it", value: "This is an overlay. Without a base mattress underneath, a pump failure leaves the patient on a hard platform — exactly the situation it exists to prevent." },
      { label: "The weight dial is functional", value: "Set too firm it does not relieve pressure; too soft and the patient bottoms out. It needs resetting when the patient's weight changes materially." },
      { label: "It does not replace turning", value: "The most common failure we see is a family assuming the mattress has taken over. Repositioning every two hours remains a nursing requirement." },
      { label: "The surface traps moisture", value: "Waterproof also means non-breathable. Keep bedding light and change it promptly, or you trade pressure damage for moisture damage." },
    ],
    faqs: [
      { question: "Does an air mattress prevent bed sores?", answer: "It substantially reduces the risk by ensuring no area of skin bears weight continuously — but only alongside two-hourly repositioning and daily skin checks. Used as a replacement for turning, it does not prevent sores." },
      { question: "Bubble or tubular air mattress — which is better?", answer: "Bubble for prevention in lighter patients; tubular where sores have already developed or the patient is heavier, since it carries more weight and relieves pressure more deeply." },
      { question: "Can I put an air mattress directly on the bed frame?", answer: "No. It is an overlay and needs a base mattress beneath it, so that a pump failure does not leave the patient on the frame." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Air_Beds.jpg", "Alternating-pressure anti-decubitus air mattress with control pump")],
    availability: DELHI,
    relatedSlugs: ["hospital-bed", "icu-bed", "dvt-pump", "icu-setup-at-home"],
    badges: ["bestseller", "sanitised", "same-day-delivery"],
    cdscoClass: "A",
    medical: profile("pressureCare"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "hospital-furniture",
    name: "Hospital Furniture",
    summary:
      "Overbed tables, bedside lockers, attendant stools, IV stands, foot steps and screens — the supporting furniture a care room needs around the bed.",
    categorySlug: "hospital-furniture",
    useCaseSlugs: ["elderly-daily-care", "cannot-get-out-of-bed", "post-surgery-recovery"],
    description:
      "The bed gets all the attention, and then the family discovers there is nowhere to put a plate of food, nowhere for the attendant to sit through a night shift, and nothing to hang a drip from. Overbed tables, bedside lockers, IV stands, attendant stools, foot steps and privacy screens are what turn a bedroom into a workable care room. Individually unremarkable; collectively the difference between care that is manageable and care that is a daily struggle.",
    indications: [
      "Setting up a home care room around a hospital bed",
      "Facility ward furnishing",
      "Providing for an attendant working long shifts",
      "Privacy in shared rooms",
    ],
    audience: ["Families setting up a care room at home", "Hospitals, nursing homes and clinics"],
    brandsAvailable: ["Godrej Interio", "Hospiline", "Narang Medical", "Assorted OEM"],
    specifications: [
      { label: "Overbed table", value: "Height-adjustable, tilting top, castored" },
      { label: "Bedside locker", value: "Drawer and cabinet, laminate or steel" },
      { label: "IV stand", value: "Stainless steel, height-adjustable, 2 or 4 hook" },
      { label: "Attendant stool", value: "Revolving, height-adjustable, castored" },
      { label: "Foot step", value: "Single or double, anti-slip tread" },
      { label: "Bedside screen", value: "Two or three-fold, castored" },
    ],
    dimensions: { extra: [{ label: "Varies by item", value: "Dimensions supplied per item on request — tell us the room and we will work out what fits" }] },
    alsoKnowAbout: [
      { label: "Sale only", value: "Furniture is not carried on the rental fleet." },
      { label: "Floor space is the binding constraint", value: "In a room that already holds a hospital bed, an oxygen concentrator and a monitor, there is less room than people expect. Work out the layout before ordering." },
      { label: "Nothing here is a grab rail", value: "Overbed tables and stools roll. A patient who leans on one to stand can tip it — this is a common cause of falls in home care rooms." },
      { label: "Keep both sides of the bed clear", value: "Turning a patient needs access from both sides, and an emergency needs a clear route to the door." },
    ],
    faqs: [
      { question: "What furniture do I need for a home care room?", answer: "At minimum an overbed table and a bedside locker. Add an IV stand if infusions are running, an attendant stool if someone sits through the night, and a foot step if the patient transfers themselves. Tell us the room dimensions and we will work out what actually fits." },
      { question: "Can a patient use an overbed table to pull themselves up?", answer: "No. It has castors and will roll. Patients leaning on rolling furniture to stand is a common cause of falls — use the bed rails or a proper grab rail instead." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Hospital_Furnitures.jpg", "Hospital furniture including overbed table, bedside locker, IV stand and attendant stool")],
    availability: DELHI,
    relatedSlugs: ["hospital-bed", "hospital-fowler-bed", "electric-hospital-bed"],
    badges: ["same-day-delivery"],
    cdscoClass: "unclassified",
    medical: profile("furniture"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "auto-cpap-system",
    name: "Auto CPAP System",
    summary:
      "Auto-titrating CPAP that adjusts pressure breath by breath within a prescribed range — for patients whose pressure requirement varies through the night.",
    categorySlug: "bipap-cpap",
    useCaseSlugs: ["breathing-difficulty", "elderly-daily-care"],
    description:
      "A fixed CPAP holds one pressure all night, which has to be high enough for the worst moment — usually REM sleep on your back. An auto-titrating machine instead works within a prescribed range, sensing flow limitation and raising pressure only when the airway starts to narrow. Most of the night it runs lower, which is more comfortable and, for a lot of patients, the difference between using the machine and abandoning it. It also handles the case where the requirement genuinely shifts — with weight change, alcohol, position or nasal congestion.",
    indications: [
      "Obstructive sleep apnoea with a variable pressure requirement",
      "Patients intolerant of fixed CPAP pressure",
      "Positional or REM-predominant sleep apnoea",
      "Auto-titration to establish a fixed prescription",
    ],
    audience: ["Patients diagnosed with obstructive sleep apnoea", "Sleep clinics performing home titration"],
    brandsAvailable: ["ResMed", "Philips Respironics", "BMC", "Löwenstein"],
    specifications: [
      { label: "Pressure range", value: "4–20 cm H₂O, auto-adjusting within prescribed limits" },
      { label: "Modes", value: "Auto-CPAP and fixed CPAP" },
      { label: "Algorithm", value: "Responds to flow limitation, snore and apnoea" },
      { label: "Humidifier", value: "Heated, integrated; distilled water only" },
      { label: "Expiratory relief", value: "Pressure drop on exhalation" },
      { label: "Data", value: "On-board compliance, AHI and pressure-percentile logging" },
    ],
    dimensions: { width: "260 mm", length: "150 mm", height: "85 mm", weight: "Approximately 1.3 kg with humidifier" },
    alsoKnowAbout: [
      { label: "Sale only", value: "The rental fleet carries fixed CPAP and BiPAP. If you want to trial auto-titration before buying, ask — we will work something out." },
      { label: "The range is still a prescription", value: "Auto does not mean unsupervised. The minimum and maximum pressures come from the treating clinician; the machine chooses within them, not outside them." },
      { label: "Not a substitute for BiPAP", value: "Auto-CPAP still delivers a single pressure at any moment. Patients who need help breathing out — COPD, obesity hypoventilation, neuromuscular weakness — need BiPAP." },
      { label: "Same mask rules apply", value: "Fit is still the deciding factor. A leaking mask also confuses the auto algorithm, which reads leak as flow and can drive pressure up." },
    ],
    faqs: [
      { question: "What is the difference between CPAP and Auto CPAP?", answer: "Fixed CPAP holds one pressure all night, set high enough for the worst moment. Auto CPAP adjusts breath by breath within a prescribed range, so it runs lower most of the night. Many patients find auto more comfortable, which matters because comfort determines whether the therapy is used." },
      { question: "Is Auto CPAP better than fixed CPAP?", answer: "Not clinically better, but often better tolerated — and an average machine used every night beats a perfect one in a cupboard. It also suits patients whose requirement varies with position, weight or congestion." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Auto_Cpap_System.jpg", "Auto-titrating CPAP system with heated humidifier and mask")],
    availability: DELHI,
    relatedSlugs: ["cpap-machine", "bipap-machine", "bipap-system-st"],
    badges: ["sanitised", "technician-installed", "new"],
    cdscoClass: "C",
    medical: profile("pap"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "bipap-system-st",
    name: "BiPAP System (S/T & AVAPS)",
    summary:
      "Advanced bi-level system with timed backup rate and volume-assured pressure support, for chronic respiratory failure and neuromuscular weakness.",
    categorySlug: "bipap-cpap",
    useCaseSlugs: ["breathing-difficulty", "critical-care-at-home"],
    description:
      "Standard BiPAP waits for the patient to start each breath. An S/T machine adds a timed backup rate, so if the patient does not trigger a breath within a set interval, the machine delivers one anyway — which matters in neuromuscular disease, in central apnoea, and in anyone whose respiratory drive is unreliable. AVAPS goes further and adjusts pressure automatically to hold a target tidal volume, so ventilation stays constant as the patient's mechanics change through the night. This is home ventilation rather than sleep therapy, and it is prescribed accordingly.",
    indications: [
      "Chronic respiratory failure requiring home ventilation",
      "Neuromuscular disease with weak respiratory muscles",
      "Central sleep apnoea and unreliable respiratory drive",
      "Obesity hypoventilation needing assured tidal volume",
    ],
    audience: ["Patients prescribed home non-invasive ventilation", "Home ICU setups with nursing cover", "Respiratory units and step-down care"],
    brandsAvailable: ["Philips Respironics", "ResMed", "Löwenstein"],
    specifications: [
      { label: "Pressure range", value: "4–30 cm H₂O" },
      { label: "Modes", value: "S, S/T, T, PC and AVAPS depending on model" },
      { label: "Backup rate", value: "Adjustable timed breaths per minute" },
      { label: "AVAPS", value: "Automatic pressure adjustment to a target tidal volume" },
      { label: "Alarms", value: "Disconnect, low tidal volume, apnoea, power failure" },
      { label: "Humidifier", value: "Heated, integrated" },
      { label: "Data", value: "Detailed ventilation logging for the treating clinician" },
    ],
    dimensions: { width: "285 mm", length: "165 mm", height: "95 mm", weight: "Approximately 2 kg with humidifier" },
    alsoKnowAbout: [
      { label: "Sale only", value: "The rental fleet carries standard BiPAP. This is a prescribed home ventilator and is supplied for purchase against a specialist's settings." },
      { label: "This is ventilation, not sleep therapy", value: "Settings come from a respiratory specialist and normally follow a titration study. Trained cover should be available, particularly overnight." },
      { label: "Alarms need setting and attending", value: "Disconnect and low-tidal-volume alarms are the safety net for a patient who cannot breathe adequately unaided. Muting them removes the point of the machine." },
      { label: "Power backup is not optional", value: "For a patient dependent on ventilatory support, an inverter sized for overnight running is part of the setup, not an accessory." },
    ],
    faqs: [
      { question: "What does S/T mode mean on a BiPAP machine?", answer: "Spontaneous/Timed. The machine supports breaths the patient starts, and delivers a timed breath if they do not start one within a set interval. It is used where respiratory drive is unreliable — neuromuscular disease, central apnoea." },
      { question: "What is AVAPS?", answer: "Average Volume-Assured Pressure Support. The machine adjusts pressure automatically to keep tidal volume at a target, so ventilation stays constant as the patient's lung mechanics change through the night." },
      { question: "Can this be used at home?", answer: "Yes — it is designed for home ventilation. It requires specialist-set parameters, working alarms, power backup, and normally trained cover overnight." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Bipap_System.jpg", "Advanced bi-level BiPAP system with S/T mode and volume-assured pressure support")],
    availability: DELHI,
    relatedSlugs: ["bipap-machine", "auto-cpap-system", "icu-setup-at-home", "oxygen-concentrator"],
    badges: ["technician-installed", "sanitised"],
    cdscoClass: "C",
    medical: profile("pap", {
      contraindications: [
        { name: "Use without working disconnect and low-volume alarms", description: "For a patient dependent on ventilatory support, the alarms are the safety net. A muted or failed alarm removes the machine's protective function." },
      ],
      adverseOutcomes: [
        { name: "Undetected circuit disconnection overnight", description: "A disconnected circuit on a ventilator-dependent patient causes hypoventilation and can progress to respiratory arrest if the alarm is muted or unheard.", serious: true },
      ],
      specialties: ["Pulmonary", "RespiratoryTherapy", "Neurologic"],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "portable-oxygen-concentrator",
    name: "Portable Oxygen Concentrator",
    summary:
      "Battery-powered pulse-dose oxygen concentrator, cabin-approved and light enough to carry — for patients who need oxygen but not confinement.",
    categorySlug: "oxygen-therapy",
    useCaseSlugs: ["breathing-difficulty", "elderly-daily-care"],
    description:
      "A portable concentrator runs on a battery and delivers oxygen in pulses timed to the patient's breath, rather than as a continuous flow. That pulse-dose design is what makes it small enough to carry, and it is also its main limitation — most portables cannot deliver a continuous flow, so they do not suit patients who need oxygen while asleep or who breathe too shallowly to trigger reliably. For a patient who is stable on modest daytime oxygen, it is the difference between being housebound and going to the clinic, a wedding, or their daughter's house.",
    indications: [
      "Ambulatory oxygen for stable patients on modest prescriptions",
      "Travel, including most commercial flights",
      "Clinic and hospital appointments",
      "Patients who are otherwise housebound by a static concentrator",
    ],
    audience: ["Mobile patients on long-term oxygen therapy", "Patients who travel", "Families wanting a relative to leave the house"],
    brandsAvailable: ["Philips Respironics", "Inogen", "Nidek", "OxyGo"],
    specifications: [
      { label: "Delivery", value: "Pulse dose, settings 1–5", note: "Pulse settings are not equivalent to litres per minute — confirm the setting with the treating clinician." },
      { label: "Continuous flow", value: "Not available on most portable models" },
      { label: "Battery life", value: "Approximately 3–5 hours single battery, 6–10 hours double" },
      { label: "Charging", value: "Mains and 12 V car adaptor" },
      { label: "Oxygen purity", value: "90% ±3" },
      { label: "Noise", value: "Approximately 40 dB(A)" },
      { label: "Air travel", value: "Most models FAA-approved; confirm with the airline in advance" },
    ],
    dimensions: { height: "215 mm", width: "180 mm", length: "80 mm", weight: "2.2–2.8 kg with battery" },
    alsoKnowAbout: [
      { label: "Sale only", value: "The rental fleet carries static concentrators and cylinders. Portables are supplied for purchase." },
      { label: "Pulse settings are not LPM", value: "A 'setting 3' on a portable is not three litres per minute. Delivered dose depends on breathing rate, so the setting must be confirmed against the patient's saturation by the treating clinician." },
      { label: "Usually not for sleep", value: "Pulse dose relies on detecting each breath. Shallow sleeping breaths may not trigger it reliably, so most patients need a static concentrator overnight." },
      { label: "Tell the airline in advance", value: "Most models are FAA-approved, but airlines require notice and usually proof of enough battery for the flight plus a margin. Do not assume it can be arranged at the gate." },
    ],
    faqs: [
      { question: "Can I take a portable oxygen concentrator on a plane?", answer: "Most models are FAA-approved for cabin use, but the airline needs advance notice and typically requires batteries covering the flight duration plus about 50%. Arrange it well before travel rather than at the airport." },
      { question: "Can a portable concentrator replace my home concentrator?", answer: "Usually not. Portables deliver pulse doses rather than continuous flow, which most patients cannot rely on while asleep. The normal arrangement is a static concentrator at home and a portable for going out." },
      { question: "What does 'setting 3' mean on a portable concentrator?", answer: "It is a pulse volume, not a flow rate in litres per minute. The delivered dose varies with breathing rate, so the correct setting has to be confirmed against the patient's oxygen saturation by the treating clinician." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Portable_Oxygen_Concentrator.jpg", "Battery-powered portable oxygen concentrator with carry strap")],
    availability: DELHI,
    relatedSlugs: ["oxygen-concentrator", "oxygen-cylinder", "cpap-machine"],
    badges: ["new", "sanitised", "same-day-delivery"],
    cdscoClass: "B",
    medical: profile("oxygen", {
      procedure:
        "The technician fits the cannula, sets the pulse setting to the treating clinician's specification, confirms the patient triggers the device reliably at rest and while walking, checks saturation on that setting, and demonstrates battery changes and charging from both mains and a car adaptor.",
      contraindications: [
        { name: "Patients who cannot reliably trigger a pulse dose", description: "Pulse delivery depends on detecting each breath. Shallow, mouth-breathing or sleeping patients may not trigger it, and receive far less oxygen than the setting implies." },
        { name: "Prescriptions requiring continuous flow", description: "Most portable units cannot deliver continuous flow. A continuous-flow prescription needs a static concentrator or a cylinder." },
      ],
      adverseOutcomes: [
        { name: "Under-dosing from an untriggered pulse", description: "If the device does not sense a breath it delivers nothing, and the patient can desaturate without any alarm indicating why.", serious: true },
      ],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "multi-parameter-monitor",
    name: "Multi-Parameter Monitor",
    summary:
      "Five- and seven-parameter bedside monitor with etCO₂ capability, for facilities and permanent high-dependency rooms.",
    categorySlug: "patient-monitors",
    useCaseSlugs: ["critical-care-at-home", "cannot-get-out-of-bed"],
    description:
      "The facility-grade version of the bedside monitor: five parameters as standard, seven with end-tidal CO₂ and invasive pressure options, a larger display, longer trend storage and central-station networking. Hospitals and nursing homes buy these because they run for years and need to talk to each other. The clinical caveats are identical to any monitor — the numbers are only as useful as the person watching them, and the alarm limits have to be set for the patient rather than left as they came.",
    indications: [
      "Facility high-dependency and critical care",
      "Permanent home ICU rooms",
      "Post-operative and recovery monitoring",
      "Patients requiring capnography",
    ],
    audience: ["Hospitals, nursing homes and clinics", "Long-term home critical care setups"],
    brandsAvailable: ["BPL Medical", "Schiller", "Nihon Kohden", "Contec"],
    specifications: [
      { label: "Parameters", value: "ECG, SpO₂, NIBP, respiration, temperature; etCO₂ and IBP on 7-para" },
      { label: "Display", value: "12.1\" or 15\" colour TFT" },
      { label: "Trend storage", value: "Up to 240 hours with full alarm event capture" },
      { label: "Networking", value: "Central station capable on most models" },
      { label: "Alarms", value: "Three-level, configurable per parameter" },
      { label: "Battery", value: "4 hours internal backup" },
      { label: "Printer", value: "Optional integrated thermal recorder" },
    ],
    dimensions: { width: "350 mm", height: "300 mm", length: "180 mm", weight: "Approximately 6 kg" },
    alsoKnowAbout: [
      { label: "Sale only", value: "The rental fleet carries the patient monitor and cardiac monitor. This one is supplied for purchase." },
      { label: "etCO₂ needs consumables", value: "Capnography sampling lines are single-use and represent a genuine ongoing cost. Factor them in if you plan to use the seven-parameter capability." },
      { label: "Same alarm discipline", value: "A facility-grade monitor left on default limits produces facility-grade alarm fatigue. Limits are per patient, and get revisited when the patient changes." },
      { label: "Networking needs planning", value: "Central-station capability is only useful if the network and the station exist. Specify them together or the feature goes unused." },
    ],
    faqs: [
      { question: "What is the difference between a 5-para and 7-para monitor?", answer: "Five-parameter covers ECG, SpO₂, blood pressure, respiration and temperature. Seven-parameter adds end-tidal CO₂ and usually invasive pressure. Capnography matters mainly for ventilated or sedated patients." },
      { question: "Do I need a multi-parameter monitor at home?", answer: "Only with trained cover present to act on it. For facilities and permanent high-dependency rooms it is the right purchase; for a temporary home need, the rental monitors do the same clinical job." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Multi_Parameter_Monitor.jpg", "Seven-parameter bedside patient monitor with large colour display and trend traces")],
    availability: DELHI,
    relatedSlugs: ["patient-monitor", "cardiac-monitor", "icu-setup-at-home"],
    badges: ["technician-installed", "sanitised"],
    cdscoClass: "C",
    medical: profile("monitor"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "infusion-pump",
    name: "Infusion Pump",
    summary:
      "Volumetric infusion pump for controlled delivery of fluids, antibiotics and nutrition, with occlusion and air-in-line alarms.",
    categorySlug: "pumps",
    useCaseSlugs: ["critical-care-at-home", "post-surgery-recovery"],
    description:
      "An infusion pump delivers fluid at a set rate through a giving set, and keeps delivering it accurately whether the bag is full or nearly empty — which gravity drip does not. That accuracy is the point: antibiotics that must go in over a fixed interval, feeds that must run overnight without flooding the patient, fluids in someone whose circulation cannot tolerate a swing. It alarms on occlusion, on air in the line, and at end of infusion. It is a nurse's device; loading and rate-setting are clinical tasks, and a mistyped rate is a medication error.",
    indications: [
      "Home intravenous antibiotic courses",
      "Enteral or parenteral nutrition",
      "Controlled fluid replacement",
      "Long-term infusion therapy at home or in a facility",
    ],
    audience: ["Home care with trained nursing cover", "Hospitals, nursing homes and day-care units"],
    brandsAvailable: ["B. Braun", "Fresenius Kabi", "Niscomed", "Assorted OEM"],
    specifications: [
      { label: "Rate range", value: "0.1–1200 ml/hour" },
      { label: "Accuracy", value: "±5% typical" },
      { label: "Alarms", value: "Occlusion, air-in-line, end of infusion, door open, low battery" },
      { label: "Modes", value: "Rate/volume, drip, sequential and KVO" },
      { label: "Battery", value: "Approximately 4–6 hours" },
      { label: "Giving sets", value: "Single-use consumables, changed on the clinician's schedule" },
    ],
    dimensions: { width: "215 mm", height: "140 mm", length: "125 mm", weight: "Approximately 2.2 kg" },
    alsoKnowAbout: [
      { label: "Sale only", value: "The rental fleet carries the DVT pump. Infusion and syringe pumps are supplied for purchase." },
      { label: "It needs a trained nurse", value: "Priming, loading and rate-setting are clinical tasks. This is not equipment a family operates on its own, and Encone Care can supply the nursing alongside it." },
      { label: "Watch the site, not just the pump", value: "The pump will keep infusing into tissue as happily as into a vein. Swelling, coolness or pain at the cannula site needs acting on regardless of what the screen says." },
      { label: "Giving sets are single-use", value: "Reusing a giving set is an infection route straight into the bloodstream. They are consumables and are changed on schedule." },
    ],
    faqs: [
      { question: "Can an infusion pump be used at home?", answer: "Yes, with trained nursing cover. Priming, loading and rate-setting are clinical tasks and a mistyped rate is a medication error, so this is not equipment a family should run unsupported." },
      { question: "What is the difference between an infusion pump and a syringe pump?", answer: "An infusion pump delivers larger volumes from a bag through a giving set — fluids, antibiotics, feeds. A syringe pump delivers small, very precise volumes from a syringe, typically potent drugs like sedatives or inotropes." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Infusion_Pumps.jpg", "Volumetric infusion pump with giving set loaded and rate display")],
    availability: DELHI,
    relatedSlugs: ["syringe-pump", "dvt-pump", "icu-setup-at-home", "patient-monitor"],
    badges: ["technician-installed", "sanitised"],
    cdscoClass: "C",
    medical: profile("pump"),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "syringe-pump",
    name: "Syringe Pump",
    summary:
      "Precision syringe driver for low-volume, high-accuracy delivery of sedatives, analgesics, inotropes and insulin.",
    categorySlug: "pumps",
    useCaseSlugs: ["critical-care-at-home", "post-surgery-recovery"],
    description:
      "A syringe pump advances the plunger of a standard syringe at a controlled rate, delivering volumes as small as fractions of a millilitre an hour. That precision is needed for drugs where the difference between a therapeutic and a dangerous dose is small — sedatives, opioids, inotropes, insulin. The flip side is that the same precision executes an error exactly as faithfully: a misplaced decimal delivers ten times the intended dose without hesitation. Rate checking against a written prescription is not bureaucracy here, it is the safety mechanism.",
    indications: [
      "Continuous sedation or analgesia in palliative and critical care",
      "Inotrope and vasoactive drug infusion",
      "Insulin infusion",
      "Any low-volume infusion requiring high accuracy",
    ],
    audience: ["Home critical care and palliative care with nursing cover", "Hospitals, ICUs and nursing homes"],
    brandsAvailable: ["B. Braun", "Fresenius Kabi", "Niscomed", "Assorted OEM"],
    specifications: [
      { label: "Rate range", value: "0.1–1500 ml/hour depending on syringe size" },
      { label: "Accuracy", value: "±2% typical" },
      { label: "Syringe sizes", value: "5, 10, 20, 30 and 50 ml" },
      { label: "Alarms", value: "Occlusion, near-empty, end of infusion, low battery" },
      { label: "Bolus", value: "Programmable with configurable limits" },
      { label: "Battery", value: "Approximately 6–8 hours" },
    ],
    dimensions: { width: "310 mm", height: "115 mm", length: "125 mm", weight: "Approximately 2 kg" },
    alsoKnowAbout: [
      { label: "Sale only", value: "Not carried on the rental fleet." },
      { label: "Decimal errors are the danger", value: "The pump delivers exactly what it is told. With sedatives, opioids, inotropes or insulin, a tenfold rate error can be fatal — which is why the rate is checked against a written prescription every time it is set." },
      { label: "Syringe brand affects accuracy", value: "The pump is calibrated against specific syringe dimensions. Substituting a different brand changes delivered volume; use what the pump is set for." },
      { label: "Occlusion alarms can lag", value: "At very low rates, pressure builds slowly and an occlusion may take a long time to alarm. The line and site still need visual checks." },
    ],
    faqs: [
      { question: "What is a syringe pump used for?", answer: "Delivering small, precisely controlled volumes of potent drugs — sedatives, opioids, inotropes, insulin — where the therapeutic and dangerous doses are close together. Larger volumes like fluids and antibiotics go through a volumetric infusion pump instead." },
      { question: "Can a syringe pump be used at home?", answer: "Yes, commonly in home palliative care, but always with trained nursing cover. Loading, rate-setting and checking against the prescription are clinical tasks." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Syringe_Pump.jpg", "Precision syringe pump with loaded syringe and rate display")],
    availability: DELHI,
    relatedSlugs: ["infusion-pump", "icu-setup-at-home", "patient-monitor"],
    badges: ["technician-installed", "sanitised"],
    cdscoClass: "C",
    medical: profile("pump", {
      adverseOutcomes: [
        { name: "Delayed occlusion alarm at low rates", description: "At very low infusion rates pressure builds slowly, so an occluded line can go unalarmed for a long period while the patient receives nothing." },
      ],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "portable-suction-machine",
    name: "Portable Suction Machine",
    summary:
      "Battery-operated suction unit for airway clearance during transport and power cuts — the backup that matters for a tracheostomised patient.",
    categorySlug: "suction",
    useCaseSlugs: ["critical-care-at-home", "cannot-get-out-of-bed"],
    description:
      "A mains suction machine stops when the power does. For a patient who needs frequent airway clearance, that is not an inconvenience, it is the emergency the equipment exists to prevent. A portable unit runs off an internal battery and a car adaptor, which covers both the power cut at home and the journey to hospital. It is smaller and its jar is smaller, so it is a companion to a mains unit rather than a replacement — but for a tracheostomised patient it is the one that gets used at the worst moment.",
    indications: [
      "Backup suction during power failure",
      "Airway clearance during transport to hospital or clinic",
      "Tracheostomy care away from a mains supply",
      "Ambulance and field use",
    ],
    audience: ["Families caring for a tracheostomised patient", "Home ICU setups", "Ambulance services and clinics"],
    brandsAvailable: ["Allied Healthcare", "Devilbiss", "Niscomed", "Assorted OEM"],
    specifications: [
      { label: "Vacuum range", value: "0–600 mmHg, adjustable" },
      { label: "Flow rate", value: "Approximately 18–25 L/min" },
      { label: "Collection jar", value: "300–800 ml with overflow protection" },
      { label: "Battery", value: "Approximately 45–60 minutes continuous" },
      { label: "Power", value: "Internal battery, mains charger and 12 V car adaptor" },
      { label: "Weight", value: "Light enough to carry one-handed with the patient" },
    ],
    dimensions: { width: "250 mm", height: "180 mm", length: "170 mm", weight: "Approximately 3 kg" },
    alsoKnowAbout: [
      { label: "Sale only", value: "The rental fleet carries the mains suction unit. Portables are supplied for purchase." },
      { label: "It is a companion, not a replacement", value: "Lower vacuum, smaller jar, limited battery. For routine daily suction the mains unit is the right tool; this is for when the mains unit cannot be used." },
      { label: "Keep it charged", value: "A portable suction unit with a flat battery is furniture. Charge it on a schedule, not when you next need it." },
      { label: "Same technique, same risks", value: "Suction on withdrawal only, passes under fifteen seconds, prescribed pressure. Being portable changes none of that." },
    ],
    faqs: [
      { question: "Do I need a portable suction machine as well as a mains one?", answer: "If the patient needs frequent suction, yes. A mains unit stops during a power cut and cannot travel, and for a secretion-loaded or tracheostomised patient both of those are situations you have to be able to handle." },
      { question: "How long does the battery last?", answer: "Roughly 45 to 60 minutes of continuous running, which is far longer than actual suction time — passes are seconds, not minutes. It also charges from a car adaptor during transport." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Portable_Suction_Machine.jpg", "Battery-operated portable suction machine with collection jar and carry handle")],
    availability: DELHI,
    relatedSlugs: ["suction-machine", "icu-setup-at-home", "oxygen-cylinder"],
    badges: ["new", "sanitised", "same-day-delivery"],
    cdscoClass: "B",
    medical: profile("suction", {
      contraindications: [
        { name: "Reliance on a portable unit for routine daily suction", description: "Lower vacuum, a smaller jar and limited battery make it a backup and transport device. Routine suction should use the mains unit." },
      ],
      adverseOutcomes: [
        { name: "No suction available from a flat battery", description: "An uncharged portable unit is unusable at exactly the moment it is needed — during a power cut or in transit.", serious: true },
      ],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "electric-wheelchair",
    name: "Electric Wheelchair",
    summary:
      "Battery-powered wheelchair with joystick control and foldable frame — independent mobility for users who cannot self-propel a manual chair.",
    categorySlug: "wheelchairs",
    useCaseSlugs: ["elderly-daily-care", "cannot-get-out-of-bed"],
    description:
      "An electric wheelchair replaces the attendant. For a user with enough hand function to work a joystick but not enough arm or shoulder strength to push rims — which describes a great many people with neurological conditions, arthritis or simple frailty — it is the difference between going somewhere when they want to and going somewhere when someone else is free. That autonomy is worth more to most users than any feature on the spec sheet, and it is why powered chairs are almost always bought rather than rented.",
    indications: [
      "Users unable to self-propel a manual wheelchair",
      "Neurological conditions with upper limb weakness",
      "Long-distance mobility where an attendant is not always available",
      "Users for whom independence is a stated goal of care",
    ],
    audience: ["Long-term wheelchair users", "Elderly users with limited upper body strength", "Families wanting to restore a relative's independence"],
    brandsAvailable: ["Karma", "Ostrich Mobility", "Vissco", "Assorted OEM"],
    specifications: [
      { label: "Control", value: "Joystick, mountable either side" },
      { label: "Range", value: "Approximately 15–25 km per charge" },
      { label: "Speed", value: "Up to 6 km/h" },
      { label: "Battery", value: "Lithium-ion or sealed lead-acid, removable" },
      { label: "Frame", value: "Folding, for car transport" },
      { label: "Brakes", value: "Electromagnetic, automatic on release of the joystick" },
      { label: "Gradient", value: "Up to approximately 8°" },
    ],
    dimensions: { width: "620 mm open", length: "1000 mm", height: "930 mm", weight: "23–30 kg with battery", loadCapacity: "120 kg" },
    alsoKnowAbout: [
      { label: "Sale only", value: "The rental fleet carries manual wheelchairs. Powered chairs are supplied for purchase — they are almost always a long-term need anyway." },
      { label: "The user needs cognitive as well as physical capacity", value: "A joystick-driven chair moving at 6 km/h requires judgement about obstacles, kerbs and traffic. Confusion or significant visual impairment makes a powered chair unsafe." },
      { label: "Battery weight is real", value: "At up to 30 kg, folding it into a car boot is a two-person job unless the battery comes out first. Check this before assuming it travels." },
      { label: "Still needs a pressure cushion", value: "Powered chairs get used for longer stretches than manual ones, which increases rather than reduces the pressure risk for all-day sitting." },
    ],
    faqs: [
      { question: "Who should use an electric wheelchair instead of a manual one?", answer: "Someone with enough hand function to work a joystick but not enough arm and shoulder strength to push the rims, and with the judgement to drive safely around obstacles and traffic. If an attendant will always be pushing, an attendant-propelled manual chair is lighter and simpler." },
      { question: "How far does an electric wheelchair go on one charge?", answer: "Roughly 15 to 25 km depending on model, terrain and user weight. Slopes and rough surfaces reduce it noticeably, so plan around the lower figure." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Electric_Wheelchair.jpg", "Battery-powered electric wheelchair with joystick control and folding frame")],
    availability: DELHI,
    relatedSlugs: ["wheelchair", "recliner-wheelchair", "hospital-bed"],
    badges: ["new", "sanitised", "technician-installed"],
    cdscoClass: "A",
    medical: profile("mobility", {
      contraindications: [
        { name: "Significant cognitive or visual impairment", description: "A joystick-driven chair at 6 km/h requires judgement about obstacles, kerbs and traffic. Where that judgement is impaired, a powered chair is unsafe for the user and for others." },
      ],
      adverseOutcomes: [
        { name: "Collision from misjudged control", description: "Powered chairs carry momentum a manual chair does not. Misjudged turns and door frames cause hand and foot injuries.", serious: true },
      ],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },

  {
    slug: "recliner-wheelchair",
    name: "Recliner Wheelchair",
    summary:
      "High-back reclining wheelchair with elevating leg rests and head support, for users who cannot sit upright for long periods.",
    categorySlug: "wheelchairs",
    useCaseSlugs: ["cannot-get-out-of-bed", "elderly-daily-care", "critical-care-at-home"],
    description:
      "A reclining wheelchair lets the user shift between sitting and near-lying without leaving the chair, which matters for anyone who cannot hold an upright posture for long — poor trunk control, postural hypotension, advanced neurological disease, or simple fatigue. Changing the angle also redistributes pressure, which is why it suits patients who spend most of the day out of bed. It is heavier than a standard chair and is designed to be pushed rather than self-propelled.",
    indications: [
      "Users unable to maintain an upright sitting posture",
      "Postural hypotension requiring frequent position change",
      "Advanced neurological disease with poor trunk control",
      "Patients spending most of the day out of bed",
    ],
    audience: ["Long-term care patients and their families", "Nursing homes and palliative care facilities"],
    brandsAvailable: ["Karma", "Vissco", "Ostrich Mobility", "Assorted OEM"],
    specifications: [
      { label: "Backrest recline", value: "Approximately 90–170°" },
      { label: "Leg rests", value: "Elevating, with calf support" },
      { label: "Head support", value: "Adjustable, removable" },
      { label: "Brakes", value: "Wheel brakes plus attendant brakes" },
      { label: "Propulsion", value: "Attendant-propelled; self-propelling rims optional" },
      { label: "Frame", value: "Powder-coated steel, folding" },
    ],
    dimensions: { width: "660 mm open", length: "1150 mm", height: "1300 mm", weight: "Approximately 22 kg", loadCapacity: "115 kg" },
    alsoKnowAbout: [
      { label: "Sale only", value: "The rental fleet carries standard manual wheelchairs. Ask us if you need a recliner short-term and we will see what can be arranged." },
      { label: "Recline further, tip more easily", value: "A fully reclined chair moves its centre of gravity backwards. Anti-tip bars must stay fitted, and the attendant needs to know not to recline on a slope." },
      { label: "Recline slowly", value: "Rapid angle changes cause dizziness and fainting, which is often the reason the user needs a reclining chair to begin with." },
      { label: "Not self-propelled in practice", value: "At 22 kg with a reclining back, independent propulsion is unrealistic for most users. Plan on an attendant." },
    ],
    faqs: [
      { question: "Who needs a reclining wheelchair?", answer: "Users who cannot hold an upright posture for long — poor trunk control, postural hypotension, advanced neurological disease — and those who spend most of the day out of bed and need position changes to redistribute pressure." },
      { question: "Is a reclining wheelchair safe to use on slopes?", answer: "Not while reclined. Reclining shifts the centre of gravity backwards and raises the tipping risk considerably. Bring the backrest upright before any slope, and keep the anti-tip bars fitted." },
    ],
    offerMode: "buy-only",
    images: [img("for-sale", "Recliner_Wheelchair.jpg", "High-back reclining wheelchair with elevating leg rests and head support")],
    availability: DELHI,
    relatedSlugs: ["wheelchair", "electric-wheelchair", "recliner-motorized-bed", "air-bed"],
    badges: ["sanitised", "technician-installed"],
    cdscoClass: "A",
    medical: profile("mobility", {
      adverseOutcomes: [
        { name: "Rearward tip when reclined", description: "Reclining moves the centre of gravity backwards. On a slope, or without anti-tip bars, the chair can go over backwards and cause head injury.", serious: true },
      ],
    }),
    inStock: true,
    reviewedBy: REVIEWER,
    updatedAt: UPDATED,
  },
];

/* -------------------------------------------------------------------------- */
/*  Accessors                                                                 */
/* -------------------------------------------------------------------------- */

export function getAllProducts(): Product[] {
  return [...PRODUCTS].sort((a, b) => a.name.localeCompare(b.name));
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getProductsByUseCase(useCaseSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.useCaseSlugs.includes(useCaseSlug));
}

/** Items available on rental (they can also be bought). */
export function getRentableProducts(): Product[] {
  return PRODUCTS.filter((p) => p.offerMode === "rent-or-buy");
}

/** Featured selection for the homepage — rentables first, since that is the
 *  distinctive half of the catalogue and the more common home-care need. */
export function getFeaturedProducts(limit = 6): Product[] {
  const ordered = [
    ...PRODUCTS.filter((p) => p.offerMode === "rent-or-buy" && p.badges.includes("bestseller")),
    ...PRODUCTS.filter((p) => p.offerMode === "rent-or-buy" && !p.badges.includes("bestseller")),
    ...PRODUCTS.filter((p) => p.offerMode === "buy-only"),
  ];
  return ordered.slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const explicit = product.relatedSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));

  if (explicit.length >= limit) return explicit.slice(0, limit);

  // Top up from the same category so the rail is never sparse.
  const fallback = PRODUCTS.filter(
    (p) =>
      p.slug !== product.slug &&
      p.categorySlug === product.categorySlug &&
      !explicit.some((e) => e.slug === p.slug),
  );

  return [...explicit, ...fallback].slice(0, limit);
}

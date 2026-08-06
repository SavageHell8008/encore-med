import { profile } from "@/data/medical-profiles";
import type { CareEssential, CareEssentialGroup } from "@/lib/types";

/**
 * Care essentials — the consumables catalogue.
 *
 * Photographs live in `public/care-essentials/`. Deliberately a separate
 * catalogue from equipment: these are bought repeatedly, chosen by size and
 * material rather than specification, and never rented
 * (`18-care-essentials-research.md`).
 *
 * The clinical content matters more here than the product copy. A Foley
 * catheter and a Ryles tube are ordinary-looking objects that kill people when
 * used by someone who was never shown how — feeding into an unconfirmed nasal
 * tube is a recognised never-event. Every item that carries that kind of risk
 * gets a full MedicalDevice profile; the ones that genuinely do not (diapers,
 * lubricant gel) are not dressed up as though they do.
 *
 * As with equipment: no prices. Everything routes to a quote.
 */

const IMG = { width: 1536, height: 1024 } as const;
const UPDATED = "2026-08-06";

export const CARE_ESSENTIAL_GROUPS: {
  slug: CareEssentialGroup;
  name: string;
  description: string;
}[] = [
  {
    slug: "airway",
    name: "Airway & suction",
    description:
      "Consumables for clearing secretions in tracheostomy and bedbound patients.",
  },
  {
    slug: "urology",
    name: "Catheters & urology",
    description:
      "Indwelling catheters and the sterile lubricant used to place them.",
  },
  {
    slug: "feeding",
    name: "Feeding",
    description:
      "Nasogastric tubes for patients who cannot safely swallow.",
  },
  {
    slug: "ppe",
    name: "Gloves & protection",
    description:
      "Examination gloves and masks for anyone giving hands-on care at home.",
  },
  {
    slug: "incontinence",
    name: "Incontinence & skin care",
    description:
      "Adult diapers and the skin protection that has to go with them.",
  },
];

export const CARE_ESSENTIALS: CareEssential[] = [
  {
    slug: "foley-catheter",
    name: "Foley Catheter",
    laySynonyms: ["urine ki nali", "peshab ki pipe", "urinary catheter", "bladder tube"],
    summary:
      "Sterile indwelling urinary catheter with a retention balloon, in silicone and latex, sizes 6 Fr to 24 Fr — placed by a trained nurse, never by an untrained carer.",
    description:
      "A Foley catheter drains the bladder continuously through a soft tube held in place by a small balloon inflated inside the bladder. It is used for patients who cannot pass urine, who cannot get to a toilet at all, or whose urine output has to be measured accurately. It is also the single most common source of infection in home care, which is why the useful advice is not about the catheter but about how long it stays in: every extra day raises the risk, so it comes out as soon as it is no longer needed rather than being left because it is convenient.",
    group: "urology",
    variants: [
      { label: "Sizes", value: "6, 8, 10, 12, 14, 16, 18, 20, 22, 24 Fr", note: "Fr is circumference in millimetres. Larger is not better — it causes more urethral trauma." },
      { label: "Material", value: "All-silicone or latex with silicone coating", note: "All-silicone for latex allergy, and for anyone catheterised long-term." },
      { label: "Ways", value: "2-way (drainage) and 3-way (with irrigation channel)" },
      { label: "Balloon", value: "5–10 ml or 30 ml" },
      { label: "Supplied", value: "Sterile, individually wrapped, single-use" },
    ],
    usage: [
      "Placed by a trained nurse under aseptic technique — Encone Care can send one.",
      "Never inflate the balloon until urine is actually flowing.",
      "The drainage bag stays below bladder level at all times, including during transfers.",
      "Meatal hygiene daily with soap and water. No antiseptics unless a clinician says so.",
      "Write down the insertion date; changes follow the clinician's schedule, not appearance.",
    ],
    alsoKnowAbout: [
      { label: "Leakage usually means spasm, not a small catheter", value: "Urine bypassing the catheter is most often bladder spasm or a blockage. Replacing it with a larger size typically makes the spasm worse rather than better — ask the clinician before sizing up." },
      { label: "Infection risk is about duration", value: "Catheter-associated urinary tract infection risk accumulates daily. The most effective thing anyone can do is ask, at every review, whether it can come out yet." },
      { label: "Secure the tubing", value: "A catheter tugged by an unsecured tube causes urethral trauma over time. Use a leg strap or fixation device." },
      { label: "Cloudy or foul urine needs a call, not a flush", value: "Home flushing of a blocked or infected catheter without instruction pushes organisms upward. Call the treating clinician." },
    ],
    image: { src: "/care-essentials/foley-catheter.png", alt: "Sterile Foley urinary catheter with retention balloon and drainage funnel", kind: "hero", ...IMG },
    medical: profile("urinaryCatheter"),
    regulatedDevice: true,
    relatedProductSlugs: ["hospital-bed", "icu-setup-at-home"],
    faqs: [
      { question: "How often should a Foley catheter be changed?", answer: "On the treating clinician's schedule — commonly every two to four weeks for silicone, sooner if blocked or infected. Not when it looks discoloured, which is normal and not a reason to change." },
      { question: "Can a family member insert a Foley catheter?", answer: "No. It is a sterile clinical procedure and untrained insertion causes urethral trauma, false passages and infection. Encone Care can send a nurse to place it and to change it." },
      { question: "What size Foley catheter is needed?", answer: "The smallest that drains adequately — commonly 14 or 16 Fr for adults. This is a clinical decision; a larger catheter causes more trauma and does not reduce leakage." },
    ],
    updatedAt: UPDATED,
  },

  {
    slug: "catheter-lubricant-gel",
    name: "Catheter Lubricant Gel",
    laySynonyms: ["catheter jelly", "lignocaine gel", "lubricating jelly"],
    summary:
      "Sterile water-based lubricating jelly in single-use sachets and tubes, plain or with lignocaine, for catheter and tube insertion.",
    description:
      "Sterile lubricant is what makes catheter and tube placement atraumatic. It is a small item that gets skipped or substituted, and both are a mistake: an unlubricated catheter tears the urethral lining on the way in, and non-sterile or oil-based substitutes introduce infection and degrade latex. Plain jelly is used for most tube placements; the lignocaine version adds a local anaesthetic and is used where the clinician wants the urethra numbed before catheterisation.",
    group: "urology",
    variants: [
      { label: "Types", value: "Plain lubricating jelly, or with 2% lignocaine", note: "Lignocaine is an anaesthetic — its use is a clinical decision, not a comfort preference." },
      { label: "Formats", value: "5 g single-use sachets, 30 g tubes, pre-filled syringes" },
      { label: "Base", value: "Water-soluble", note: "Never petroleum jelly — it degrades latex catheters and is not sterile." },
      { label: "Supplied", value: "Sterile, single-use" },
    ],
    usage: [
      "Use a fresh sachet per procedure. A tube already opened is no longer sterile for the next patient.",
      "Water-based only — petroleum jelly damages latex and carries infection risk.",
      "For catheterisation, instil into the urethra rather than only coating the catheter tip.",
      "Check the expiry; sterility is dated.",
    ],
    alsoKnowAbout: [
      { label: "Lignocaine is a drug", value: "The anaesthetic version has dose limits and is contraindicated in people with known amide anaesthetic allergy. It should be used on the clinician's instruction, not chosen for comfort." },
      { label: "Do not economise here", value: "Reusing a tube across patients or across days is the classic route by which a sterile procedure stops being sterile." },
    ],
    image: { src: "/care-essentials/catheter-lubricant-gel.png", alt: "Sterile water-based catheter lubricant gel in single-use sachets and tube", kind: "hero", ...IMG },
    relatedProductSlugs: [],
    faqs: [
      { question: "Can I use petroleum jelly instead of catheter gel?", answer: "No. Petroleum jelly is not sterile and degrades latex catheters. Use a sterile water-based lubricant, which is what the catheter is designed for." },
      { question: "What is the difference between plain and lignocaine catheter gel?", answer: "Lignocaine gel contains a local anaesthetic to numb the urethra before catheterisation. It is a drug with dose limits and allergy considerations, so its use is decided by the clinician." },
    ],
    updatedAt: UPDATED,
  },

  {
    slug: "ryles-feeding-tube",
    name: "Ryles Tube (Nasogastric Feeding Tube)",
    laySynonyms: ["food pipe", "khane ki nali", "NG tube", "nasogastric tube"],
    summary:
      "Sterile PVC nasogastric tube in sizes 8 Fr to 18 Fr for feeding and gastric drainage — position must be confirmed before anything is given through it.",
    description:
      "A Ryles tube passes through the nose into the stomach so that feed, fluids and medication can be given to someone who cannot safely swallow — after a stroke, with advanced neurological disease, or while unconscious. It is a simple object attached to a serious rule: a tube that has gone into the lung instead of the stomach looks and feels exactly the same from outside. Feeding into it is fatal, and it is a recognised never-event. Position is confirmed by pH testing the aspirate, or by X-ray when the clinician requires it — the old practice of pushing air in and listening does not work.",
    group: "feeding",
    variants: [
      { label: "Sizes", value: "8, 10, 12, 14, 16, 18 Fr", note: "Finer tubes are more comfortable for feeding; wider ones are used for drainage." },
      { label: "Material", value: "Medical-grade PVC, radio-opaque line", note: "The radio-opaque line is what lets an X-ray confirm the tip position." },
      { label: "Length", value: "Approximately 105 cm, graduated markings" },
      { label: "Tip", value: "Rounded, multiple lateral eyes" },
      { label: "Supplied", value: "Sterile, individually wrapped, single-use" },
    ],
    usage: [
      "Placed by a trained nurse; the measured external length is marked and recorded.",
      "Confirm position by pH of the aspirate (or X-ray) before the first feed and after any displacement.",
      "The 'whoosh test' — pushing air in and listening — is not a valid check.",
      "Check the external marking before every feed to confirm the tube has not moved.",
      "Head of the bed at 30–45° during feeding and for 30 minutes afterwards.",
      "Flush with water before and after every feed and every medication.",
    ],
    alsoKnowAbout: [
      { label: "This is the item on this page with the highest stakes", value: "Feeding into a misplaced tube causes pneumonia or death, and it is preventable entirely by confirming position. If nobody in the household has been taught the check, do not use the tube — arrange a nurse." },
      { label: "Crushed tablets block tubes", value: "Most blockages come from medication rather than feed. Ask the clinician for liquid formulations, and flush thoroughly around every dose." },
      { label: "Re-tape daily, in a slightly different spot", value: "Constant pressure at one point on the nostril causes an ulcer within days." },
      { label: "It is a short-term route", value: "Beyond about four to six weeks, a gastrostomy is usually more comfortable and safer. Worth asking the clinician about at review." },
    ],
    image: { src: "/care-essentials/ryles-feeding-tube.png", alt: "Sterile Ryles nasogastric feeding tube with graduated markings and funnel connector", kind: "hero", ...IMG },
    medical: profile("enteralFeeding"),
    regulatedDevice: true,
    relatedProductSlugs: ["hospital-bed", "icu-setup-at-home", "suction-machine"],
    faqs: [
      { question: "How do I know a Ryles tube is in the right place?", answer: "Aspirate fluid from the tube and test it on pH paper — a pH of 5.5 or below indicates gastric placement. Where there is any doubt, or where the clinician requires it, an X-ray confirms it. Listening for a 'whoosh' after pushing air in is not a valid test and has caused deaths." },
      { question: "How long can a Ryles tube stay in?", answer: "Typically up to four to six weeks depending on the material and the clinician's instruction. Beyond that, a gastrostomy is usually more comfortable and carries less risk." },
      { question: "Can a family member pass a Ryles tube?", answer: "No. Placement and position confirmation are clinical tasks. Families can be taught to give feeds through an already-confirmed tube, including how to check the external marking before each feed." },
    ],
    updatedAt: UPDATED,
  },

  {
    slug: "suction-catheter",
    name: "Suction Catheter",
    laySynonyms: ["suction tube", "kaf nikalne ki nali", "aspiration catheter"],
    summary:
      "Sterile single-use suction catheters in sizes 6 Fr to 16 Fr with thumb-control vent, for clearing secretions through the mouth, nose or a tracheostomy.",
    description:
      "A suction catheter is the disposable tube that connects the patient to the suction machine. Size matters more than people expect: a catheter more than about half the internal diameter of the tracheostomy tube blocks the airway while suction is applied, so the patient cannot breathe in during the pass. The thumb vent exists so suction is applied only on withdrawal — covering it on the way in drags the catheter against the airway wall and strips the lining.",
    group: "airway",
    variants: [
      { label: "Sizes", value: "6, 8, 10, 12, 14, 16 Fr", note: "For a tracheostomy, no more than half the tube's internal diameter." },
      { label: "Control", value: "Thumb-control vent", note: "Suction on withdrawal only — never on insertion." },
      { label: "Tip", value: "Rounded with lateral eyes to reduce mucosal trauma" },
      { label: "Length", value: "50–60 cm" },
      { label: "Supplied", value: "Sterile, individually wrapped, single-use" },
    ],
    usage: [
      "One catheter per pass. They are single-use — reusing one puts organisms straight into the airway.",
      "Suction on withdrawal only, using the thumb vent.",
      "Keep each pass under ten to fifteen seconds; longer passes remove air along with secretions.",
      "Let the patient recover between passes, on oxygen if they are prescribed it.",
      "Set the vacuum pressure to the clinician's figure, not to maximum.",
    ],
    alsoKnowAbout: [
      { label: "Suction only when needed", value: "Routine suctioning on a fixed schedule causes unnecessary trauma. Suction on signs — audible secretions, rising work of breathing, falling saturation — not on the clock." },
      { label: "Desaturation during suction is expected; sustained desaturation is not", value: "If saturation does not recover promptly between passes, stop and call the clinician rather than suctioning more." },
      { label: "Sizing for a tracheostomy is a calculation", value: "Halve the tube's internal diameter in millimetres and multiply by three to get the maximum French size. Ask the clinician to confirm it once and write it down." },
    ],
    image: { src: "/care-essentials/suction-catheter.png", alt: "Sterile single-use suction catheters with thumb-control vent in several sizes", kind: "hero", ...IMG },
    medical: profile("suction", {
      procedure:
        "A fresh sterile catheter is used for each pass. It is introduced with the thumb vent open, advanced without suction, then suction is applied only as it is withdrawn with a gentle rotating motion. Each pass is kept under ten to fifteen seconds and the patient is allowed to recover between passes.",
      preOp:
        "Catheter size and vacuum pressure come from the treating clinician. For a tracheostomy the catheter must not exceed half the tube's internal diameter, or it obstructs the airway during the pass.",
      postOp:
        "Catheters are single-use and discarded after every pass. The collection jar is emptied and disinfected after every session, and tubing changed on the clinician's schedule.",
      // The `suction` family's legalStatus describes the machine. A catheter is
      // a separate, lower-class notified device, so it states its own.
      legalStatus:
        "Suction catheters are notified medical devices under India's Medical Devices Rules, 2017, supplied sterile and single-use. CDSCO does not license resale providers and EnconeMed claims no CDSCO approval.",
      contraindications: [
        {
          name: "Reuse of a single-use catheter",
          description:
            "A rinsed catheter carries organisms directly into the airway. These are discarded after one pass, not washed.",
        },
        {
          name: "Oversized catheter in a tracheostomy",
          description:
            "A catheter more than half the internal diameter of the tracheostomy tube occludes the airway while suction is applied, so the patient cannot breathe in during the pass.",
        },
      ],
    }),
    regulatedDevice: true,
    relatedProductSlugs: ["suction-machine", "portable-suction-machine", "icu-setup-at-home"],
    faqs: [
      { question: "What size suction catheter should I use for a tracheostomy?", answer: "No more than half the internal diameter of the tracheostomy tube. Halve the internal diameter in millimetres and multiply by three for the maximum French size — the treating clinician should confirm it once so you can write it down." },
      { question: "Can suction catheters be reused after washing?", answer: "No. They are sterile single-use items and washing does not make them safe. A reused catheter delivers organisms directly into the airway." },
      { question: "How long should each suction pass last?", answer: "Under ten to fifteen seconds. Suction removes air as well as secretions, so longer passes can desaturate a patient whose breathing is already compromised." },
    ],
    updatedAt: UPDATED,
  },

  {
    slug: "examination-gloves",
    name: "Examination Gloves",
    laySynonyms: ["hand gloves", "medical gloves", "disposable gloves"],
    summary:
      "Nitrile and latex examination gloves, powder-free, in S/M/L/XL — for every hands-on care task at home.",
    description:
      "Gloves are the most used item in any home care room and the one most often used wrongly. The two common errors are wearing one pair through several different tasks, which moves organisms around as efficiently as bare hands would, and treating gloves as a replacement for handwashing rather than an addition to it. Nitrile is the sensible default: it fits like latex, resists punctures better, and avoids latex allergy entirely — which matters for the carer as much as the patient, since sensitivity builds with repeated exposure.",
    group: "ppe",
    variants: [
      { label: "Material", value: "Nitrile or latex", note: "Nitrile is the default where anyone's latex allergy status is unknown." },
      { label: "Sizes", value: "S, M, L, XL" },
      { label: "Powder", value: "Powder-free", note: "Powder carries latex protein and irritates skin and airways." },
      { label: "Type", value: "Non-sterile examination, or sterile for aseptic procedures" },
      { label: "Packing", value: "Boxes of 100; sterile pairs individually wrapped" },
    ],
    usage: [
      "Wash hands before putting gloves on and after taking them off. Gloves add to hand hygiene, they do not replace it.",
      "Change between tasks on the same patient — catheter bag to feed is a task change.",
      "Remove without touching the outer surface, and dispose immediately.",
      "Sterile gloves for catheterisation and dressings; examination gloves for everything else.",
    ],
    alsoKnowAbout: [
      { label: "Wearing one pair all morning is worse than no gloves", value: "It creates confidence without protection, and spreads organisms from task to task. The discipline is changing them, not wearing them." },
      { label: "Latex allergy builds with exposure", value: "Carers doing this daily are the ones most at risk of becoming sensitised. Nitrile removes the question." },
      { label: "Size affects safety", value: "Loose gloves snag and tear during procedures; tight ones split. Order a size per person rather than one box for the household." },
    ],
    image: { src: "/care-essentials/examination-gloves.png", alt: "Powder-free nitrile examination gloves in a dispenser box", kind: "hero", ...IMG },
    medical: profile("ppe"),
    regulatedDevice: true,
    relatedProductSlugs: ["suction-machine"],
    faqs: [
      { question: "Nitrile or latex gloves — which is better for home care?", answer: "Nitrile for most households. It resists punctures better than latex and removes latex allergy risk for both patient and carer, which matters because sensitivity develops with repeated daily exposure." },
      { question: "Do I still need to wash my hands if I wear gloves?", answer: "Yes, before and after. Gloves supplement hand hygiene rather than replacing it — hands get contaminated while removing gloves, and gloves have unnoticed defects." },
      { question: "How often should gloves be changed?", answer: "Between every task, not just between patients. Moving from a catheter bag to preparing a feed with the same gloves transfers exactly what the gloves were meant to stop." },
    ],
    updatedAt: UPDATED,
  },

  {
    slug: "face-masks",
    name: "Face Masks",
    laySynonyms: ["surgical mask", "3 ply mask", "N95", "muh ka mask"],
    summary:
      "Three-ply surgical masks and N95 respirators for carers, visitors and immunocompromised patients at home.",
    description:
      "A three-ply surgical mask protects other people from the wearer and gives the wearer modest protection in return; an N95 seals to the face and filters the air the wearer breathes in. Which one is right depends on which direction the risk runs. For a household caring for an immunocompromised patient — after chemotherapy, on immunosuppressants, or with advanced lung disease — masks on visitors and carers with any respiratory symptoms are one of the few genuinely cheap interventions available.",
    group: "ppe",
    variants: [
      { label: "Types", value: "3-ply surgical, or N95/FFP2 respirator" },
      { label: "Fit", value: "Ear-loop or head-strap; moulded nose clip" },
      { label: "Filtration", value: "N95 filters at least 95% of airborne particles", note: "Only when it seals — facial hair and a loose fit defeat it entirely." },
      { label: "Packing", value: "Boxes of 50 or 100; N95 individually wrapped" },
    ],
    usage: [
      "Cover nose and mouth, and mould the nose clip to the bridge.",
      "Handle by the straps only; the front is the contaminated surface.",
      "Replace when damp — a wet mask has stopped working.",
      "Single-use. Do not hang one around the neck and put it back on later.",
    ],
    alsoKnowAbout: [
      { label: "N95 protects the wearer; a surgical mask protects everyone else", value: "For a carer with a cough looking after a frail patient, a surgical mask is the right choice. For a carer protecting themselves in a household with an active infection, N95." },
      { label: "A seal you can feel is the point", value: "An N95 that leaks around the edges performs roughly like a surgical mask. It should pull slightly against the face on inhalation." },
      { label: "Under the nose is not wearing a mask", value: "Worth saying plainly, because it is the most common failure and it removes the benefit entirely." },
    ],
    image: { src: "/care-essentials/face-masks.png", alt: "Three-ply surgical face masks and an N95 respirator", kind: "hero", ...IMG },
    medical: profile("ppe", {
      specialties: ["Nursing", "PublicHealth", "Pulmonary"],
    }),
    regulatedDevice: true,
    relatedProductSlugs: ["oxygen-concentrator"],
    faqs: [
      { question: "What is the difference between a surgical mask and an N95?", answer: "A surgical mask mainly stops the wearer's droplets reaching other people. An N95 seals to the face and filters what the wearer breathes in. Use a surgical mask to protect the patient from a carer; use N95 to protect the carer." },
      { question: "Can N95 masks be reused at home?", answer: "They are supplied as single-use. In practice households do reuse them, and if you must, the mask should be dry, undamaged and not contaminated — but filtration and seal both degrade with each wearing." },
    ],
    updatedAt: UPDATED,
  },

  {
    slug: "adult-diapers",
    name: "Adult Diapers",
    laySynonyms: ["adult nappy", "incontinence pads", "bade logo ka diaper"],
    summary:
      "Tape-style and pull-up adult diapers with absorbent core and leak guards, in M/L/XL — sized by waist, not by body weight.",
    description:
      "Adult diapers are usually the first thing families buy and the thing that most often gets sized wrongly. Sizing is by waist or hip measurement, not body weight — a thin patient with a large abdomen needs a bigger size than their weight suggests. The other common mistake is trusting absorbency: a highly absorbent product holds more urine against the skin for longer, and prolonged contact with urine or stool causes a chemical injury to the skin that precedes most pressure ulcers in incontinent patients. Change on soiling, not on a schedule.",
    group: "incontinence",
    variants: [
      { label: "Types", value: "Tape-style (for bedbound patients) or pull-up (for mobile patients)" },
      { label: "Sizes", value: "M (71–115 cm waist), L (89–140 cm), XL (110–160 cm)", note: "Measure the waist or hips. Body weight is a poor guide." },
      { label: "Absorbency", value: "Day and overnight variants" },
      { label: "Features", value: "Leak guards, wetness indicator, breathable back sheet" },
      { label: "Packing", value: "Packs of 10, 15 and 30" },
    ],
    usage: [
      "Measure the waist to size, and fit so the leg cuffs sit in the groin crease without gapping.",
      "Lower tapes first at the hips, upper tapes angled upward.",
      "Roll the patient to change rather than dragging — dragging tears fragile skin.",
      "Wash and dry the skin at every change; apply a barrier cream on intact skin only.",
      "Change as soon as soiled, regardless of how much the product claims to hold.",
    ],
    alsoKnowAbout: [
      { label: "More absorbent is not more protective", value: "Higher absorbency means urine sits against the skin longer between changes. Incontinence-associated dermatitis is a chemical burn, and it is the usual first step towards a pressure ulcer." },
      { label: "Use a pull-up if the patient can still walk", value: "Defaulting a mobile patient to tape-style diapers removes remaining continence and dignity. It is worth the extra effort of assisted toileting for as long as it is possible." },
      { label: "Check the groin and natal cleft daily", value: "Redness there is an early warning. It responds to more frequent changes and barrier cream; ignored, it becomes an open area within days." },
      { label: "Barrier cream goes on intact skin only", value: "Thick barrier products over broken skin trap moisture and organisms. Once skin has opened, it needs a clinician's dressing plan." },
    ],
    image: { src: "/care-essentials/adult-diapers.png", alt: "Tape-style adult incontinence diapers with leak guards", kind: "hero", ...IMG },
    medical: profile("incontinence"),
    relatedProductSlugs: ["air-bed", "hospital-bed"],
    faqs: [
      { question: "What size adult diaper should I buy?", answer: "Size by waist or hip measurement rather than body weight — M covers roughly 71–115 cm, L roughly 89–140 cm, XL roughly 110–160 cm. A thin patient with a large abdomen needs a larger size than their weight suggests." },
      { question: "How often should an adult diaper be changed?", answer: "As soon as it is soiled, not on a fixed schedule. Prolonged skin contact with urine or stool causes a chemical injury that leads to pressure ulcers, and high absorbency does not change that." },
      { question: "Tape-style or pull-up adult diapers?", answer: "Tape-style for bedbound patients, since they can be changed without standing the patient up. Pull-ups for patients who can still walk and toilet with help, which preserves independence for longer." },
    ],
    updatedAt: UPDATED,
  },
];

/* -------------------------------------------------------------------------- */

export function getAllCareEssentials(): CareEssential[] {
  return CARE_ESSENTIALS;
}

export function getCareEssential(slug: string): CareEssential | undefined {
  return CARE_ESSENTIALS.find((c) => c.slug === slug);
}

export function getCareEssentialsByGroup(group: CareEssentialGroup): CareEssential[] {
  return CARE_ESSENTIALS.filter((c) => c.group === group);
}

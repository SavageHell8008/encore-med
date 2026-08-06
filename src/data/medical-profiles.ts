import type { MedicalProfile } from "@/lib/types";

/**
 * Shared clinical profiles, by device family.
 *
 * Devices in the same family genuinely share their contraindications and
 * adverse outcomes — an electric hospital bed and a Fowler bed carry the same
 * rail-entrapment and pressure-ulcer risks, and writing those out twice invites
 * them to drift apart. So the family carries the clinical truth and each
 * product layers on what is specific to it.
 *
 * Every profile maps onto https://schema.org/MedicalDevice. See the notes in
 * `src/lib/types.ts` for the three properties deliberately not emitted
 * (`recognizingAuthority`, `purpose`, `code`) and why.
 */

const CDSCO_A =
  "Classified Class A (low risk) under India's Medical Devices Rules, 2017. CDSCO classifies devices and licenses manufacturers and importers; it does not license rental or resale providers, and Encore Care makes no claim of CDSCO approval.";
const CDSCO_B =
  "Classified Class B (low–moderate risk) under India's Medical Devices Rules, 2017. CDSCO does not license rental or resale providers and Encore Care claims no CDSCO approval.";
const CDSCO_C =
  "Classified Class C (moderate–high risk) under India's Medical Devices Rules, 2017. CDSCO does not license rental or resale providers and Encore Care claims no CDSCO approval.";

export const PROFILES = {
  /* ---------------------------------------------------------------- beds -- */
  bed: {
    procedure:
      "Delivered in sections and assembled in the room where it will be used. The technician levels the frame, fits the mattress and side rails, connects the controls, and demonstrates every position until the carer has operated each one unaided. Castors are locked once the bed is placed, leaving carer access on both sides.",
    preOp:
      "Confirm the patient's weight is within the frame's safe working load, that the doorway clears 800 mm, and that the room allows roughly 2.6 m × 1.8 m with access on both sides. Patients immobile for more than 16 hours a day should have an alternating-pressure mattress arranged at the same time.",
    postOp:
      "Repositioning every two hours remains a nursing requirement — the bed assists it, it does not replace it. Side rails must be raised whenever the patient is unattended. Rental units are stripped, detergent-washed, disinfected and inspected against the manufacturer's reprocessing instructions between patients.",
    contraindications: [
      {
        name: "Body weight above the rated safe working load",
        description:
          "Every frame states a maximum load including the mattress. Above it, a bariatric bed is required — the frame is not simply 'a bit overloaded'.",
      },
      {
        name: "Patients at risk of entrapment between rails",
        description:
          "Side rails carry a recognised entrapment risk for agitated or very slight patients. The rail gap must be assessed by the treating clinician before rails are used continuously.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Pressure ulcers",
        description:
          "A standard foam mattress does not prevent pressure sores in a continuously bedbound patient. Add an alternating-pressure mattress and keep to a turning schedule.",
      },
      {
        name: "Limb or digit pinch injury",
        description:
          "Fingers and IV lines can be caught in the backrest and knee-rest mechanism while it is moving. Check clearance before operating the control.",
      },
      {
        name: "Fall from bed",
        description:
          "Falls from a raised bed with the rails lowered can cause fracture or head injury and frequently require hospitalisation.",
        serious: true,
      },
      {
        name: "Patient entrapment in side rails",
        description:
          "Entrapment of the head, neck or chest between rail bars, or between rail and mattress, can cause asphyxiation.",
        serious: true,
      },
    ],
    specialties: ["Nursing", "Geriatric", "Musculoskeletal"],
    legalStatus: CDSCO_A,
  },

  /* ------------------------------------------------------------- oxygen -- */
  oxygen: {
    procedure:
      "Positioned with at least 300 mm clearance on every side for airflow, away from direct sun, curtains and any heat source. The technician fills the humidifier bottle with distilled water, fits a new cannula, sets the flow meter to the prescribed litres per minute, runs the unit until output stabilises, and shows the carer how to read the flow meter and respond to the low-purity and power-failure alarms.",
    preOp:
      "A prescribed flow rate from the treating clinician is required before delivery — oxygen is not supplied on a guessed setting. Confirm a stable power supply, and for oxygen-dependent patients arrange a backup cylinder or an inverter rated for the unit's continuous load.",
    postOp:
      "The gross particle filter is washed weekly and the outlet filter replaced per the manufacturer's schedule. Oxygen saturation should be monitored as directed by the treating clinician, and any change in flow rate must come from them, not from the family.",
    contraindications: [
      {
        name: "Use without a prescribed flow rate",
        description:
          "Oxygen is a drug. Supplying it at an unprescribed rate is unsafe, and we will not deliver without the treating clinician's setting.",
      },
      {
        name: "Any use near an open flame or smoking",
        description:
          "Oxygen enrichment makes fabric, hair and furnishings burn far more readily. No smoking, cooking flame, or oil-based emollient near the patient while the unit runs.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Nasal dryness, epistaxis and skin breakdown",
        description:
          "Dry gas irritates the nasal mucosa and cannula tubing rubs behind the ears. Use the humidifier bottle and reposition the tubing.",
      },
      {
        name: "Absorption atelectasis",
        description:
          "Sustained high-concentration oxygen can collapse poorly ventilated alveoli. It is one reason flow rate is a clinical decision.",
      },
      {
        name: "Carbon dioxide narcosis in COPD",
        description:
          "In patients who retain carbon dioxide, excess oxygen suppresses respiratory drive and can progress to unconsciousness and respiratory arrest.",
        serious: true,
      },
      {
        name: "Hypoxia during a power failure",
        description:
          "A concentrator stops the instant mains power fails. For an oxygen-dependent patient this is immediately life-threatening without a backup source.",
        serious: true,
      },
      {
        name: "Fire in an oxygen-enriched atmosphere",
        description:
          "Ignition near a running oxygen source spreads rapidly and causes severe burns.",
        serious: true,
      },
    ],
    specialties: ["Pulmonary", "RespiratoryTherapy", "Geriatric"],
    legalStatus: CDSCO_B,
  },

  /* ---------------------------------------------------------------- PAP -- */
  pap: {
    procedure:
      "The mask is fitted to the patient's face in person — nasal, nasal-pillow and full-face styles are tried rather than a medium being assumed, because mask leak is the single most common reason home therapy is abandoned. Pressures, mode and ramp are set to the clinician's prescription, the humidifier is filled with distilled water, and the settings are confirmed before the technician leaves.",
    preOp:
      "A sleep study or blood gas assessment and clinician-set pressures are required before delivery. Machines are not supplied on guessed settings. Confirm mains supply and, for dependent patients, that an inverter can carry the unit overnight.",
    postOp:
      "Mask cushions are replaced roughly every three months and filters monthly. Compliance data is available on the device for the treating clinician. We re-fit the mask free within the first two weeks, which is when most fit problems surface.",
    contraindications: [
      {
        name: "Untreated pneumothorax",
        description:
          "Positive airway pressure can enlarge a pneumothorax. Non-invasive ventilation is contraindicated until it is treated.",
      },
      {
        name: "Impaired consciousness or inability to protect the airway",
        description:
          "A patient who cannot remove the mask or clear secretions is at risk of aspiration; these patients need supervised or invasive ventilation instead.",
      },
      {
        name: "Recent facial, upper airway or oesophageal surgery",
        description:
          "Mask pressure and insufflation can disrupt healing at the surgical site.",
      },
      {
        name: "Active vomiting or significant haemoptysis",
        description:
          "Positive pressure with a sealed mask substantially raises aspiration risk.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Mask leak and pressure sores on the nasal bridge",
        description:
          "The commonest problem in home therapy. Usually a sizing or style mismatch rather than user error — which is why we re-fit rather than tell people to tighten the straps.",
      },
      {
        name: "Aerophagia and abdominal distension",
        description:
          "Swallowed air causes bloating and discomfort, often improved by adjusting the expiratory pressure.",
      },
      {
        name: "Dryness, congestion and eye irritation",
        description:
          "From leak past the mask seal and inadequate humidification. Use distilled water and check the seal.",
      },
      {
        name: "Aspiration of gastric contents",
        description:
          "In a drowsy or vomiting patient a sealed mask can drive gastric contents into the lungs.",
        serious: true,
      },
      {
        name: "Tension pneumothorax",
        description:
          "Positive pressure applied over an undiagnosed pneumothorax can become rapidly life-threatening.",
        serious: true,
      },
    ],
    specialties: ["Pulmonary", "RespiratoryTherapy", "Cardiovascular"],
    legalStatus: CDSCO_C,
  },

  /* ------------------------------------------------------------ monitor -- */
  monitor: {
    procedure:
      "Mounted on a bedside stand within the carer's line of sight. The technician connects the leads, probe and cuff, then sets every alarm limit to the treating doctor's instructions rather than leaving factory defaults, and demonstrates silencing versus acknowledging an alarm.",
    preOp:
      "Confirm a trained attendant or nurse will be present to act on what the monitor shows, and obtain the treating doctor's alarm limits. Without both, a monitor produces anxiety rather than safety.",
    postOp:
      "Finger probes degrade after four to six months of continuous use. Electrodes and sampling lines are consumables. Alarm limits should be revisited whenever the patient's clinical condition changes.",
    contraindications: [
      {
        name: "No trained attendant present",
        description:
          "A monitor reports; it does not treat. Without someone able to interpret and act, a pulse oximeter and clear escalation instructions serve the family better.",
      },
      {
        name: "Use of factory default alarm limits",
        description:
          "Defaults alarm almost continuously on home patients, which leads to the alarm being muted — and a muted monitor is worse than none.",
      },
      {
        name: "Cuff on a limb with a fistula, lymphoedema or a clot",
        description:
          "Repeated cuff inflation on such a limb risks vascular damage. Use an alternative site.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Skin irritation and pressure injury at sensor sites",
        description:
          "Electrodes, probes and cuffs left in one position cause irritation and pressure marks. Rotate sites regularly.",
      },
      {
        name: "False alarms from motion or poor contact",
        description:
          "Movement, cold peripheries and dried electrode gel all produce artefact that reads as a clinical event.",
      },
      {
        name: "Alarm fatigue leading to a missed deterioration",
        description:
          "Repeated false alarms train carers to ignore them, and a genuine desaturation or arrhythmia is then missed — the harm is the delay, which can be fatal.",
        serious: true,
      },
    ],
    specialties: ["Nursing", "Cardiovascular", "Emergency"],
    legalStatus: CDSCO_C,
  },

  /* ----------------------------------------------------------- mobility -- */
  mobility: {
    procedure:
      "Delivered assembled. The technician sets footrest length and backrest angle to the user's build, checks that the brakes hold on a slope, demonstrates detaching the arm and leg rests for a side transfer from a bed, and shows the attendant how to tilt the chair back to clear a kerb.",
    preOp:
      "Confirm the user's weight is within the rated capacity and that doorways clear 700 mm. Establish whether the user will self-propel or be pushed — it changes which chair is correct. For all-day sitting, add a gel or air seat cushion.",
    postOp:
      "Reposition the user and check skin over the sacrum and heels at least every two hours when seated for long periods. Brake holding force should be checked weekly; report any slip immediately rather than compensating for it.",
    contraindications: [
      {
        name: "Body weight above the rated capacity",
        description: "Beyond the frame's rating a bariatric chair is required.",
      },
      {
        name: "Unsupervised use with poor trunk control and no harness",
        description:
          "A user who cannot hold their trunk upright can slide or tip forward when left alone in a reclined chair.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Pressure sores from prolonged sitting",
        description:
          "A supplied cushion is comfort padding, not a pressure-relieving surface. Long sitting periods need a gel or air cushion plus repositioning.",
      },
      {
        name: "Postural hypotension on rapid recline change",
        description:
          "Moving the backrest quickly can cause dizziness or fainting. Change the angle gradually.",
      },
      {
        name: "Shear injury during transfer",
        description: "Dragging rather than lifting across the seat edge tears fragile skin.",
      },
      {
        name: "Tip-over or fall during a kerb or slope manoeuvre",
        description:
          "Tipping the chair at a kerb, or releasing the brakes on a slope, can throw the user out and cause head injury or fracture.",
        serious: true,
      },
    ],
    specialties: ["Physiotherapy", "Geriatric", "Musculoskeletal"],
    legalStatus: CDSCO_A,
  },

  /* ----------------------------------------------------- pressure care -- */
  pressureCare: {
    procedure:
      "Laid over the existing mattress — never instead of it — and secured at the corners. The pump hangs on the foot board with the hoses running clear of the floor. The technician sets the pressure dial to the patient's weight, runs a full inflation cycle, confirms the alternating action, and shows the carer the static mode used for transfers and personal care.",
    preOp:
      "Confirm the patient's weight is within the rated capacity and that a base mattress will remain underneath. Establish the turning schedule with the treating clinician — the mattress supplements it and does not replace it.",
    postOp:
      "Re-check the pressure setting whenever the patient's weight changes materially. Inspect skin over the sacrum, heels and elbows daily. Wipe the surface down with a neutral detergent; it is waterproof and designed for it.",
    contraindications: [
      {
        name: "Unstable spinal or pelvic fracture",
        description:
          "The shifting surface is contraindicated where an unstable fracture requires the patient to be kept still; this needs clinician sign-off.",
      },
      {
        name: "Use as a replacement for the base mattress",
        description:
          "This is an overlay. Without a mattress underneath, a pump failure leaves the patient lying on a hard platform.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Continued pressure damage from an incorrect setting",
        description:
          "Set too firm it does not relieve pressure; too soft and the patient bottoms out. The weight dial is functional, not decorative.",
      },
      {
        name: "Moisture-associated skin damage",
        description:
          "The waterproof surface traps perspiration. Keep bedding breathable and change it promptly.",
      },
      {
        name: "Progression to a deep pressure ulcer",
        description:
          "If turning is abandoned because the mattress is assumed to be sufficient, ulcers can reach muscle or bone and require hospitalisation.",
        serious: true,
      },
    ],
    specialties: ["Nursing", "Geriatric", "Neurologic"],
    legalStatus: CDSCO_A,
  },

  /* -------------------------------------------------------------- pumps -- */
  pump: {
    procedure:
      "Mounted on a stand or rail at the bedside. The technician loads the giving set or syringe, primes the line to clear air, enters the rate and volume limits the treating clinician has specified, and demonstrates the occlusion and end-of-infusion alarms before leaving.",
    preOp:
      "Infusion rate, volume limits and the drug or fluid to be delivered must come from the treating clinician in writing. A trained nurse must be available to load and change the infusion — this is not a device a family sets up alone.",
    postOp:
      "Giving sets and syringes are single-use consumables and must be changed on the clinician's schedule. Insertion sites are checked for swelling, coolness or pain at every shift.",
    contraindications: [
      {
        name: "No trained nurse to load and monitor the infusion",
        description:
          "Loading, priming and rate-setting are clinical tasks. An incorrectly primed line or a mistyped rate is a medication error, not a usability problem.",
      },
      {
        name: "Use without written rate and volume limits",
        description:
          "The pump will deliver exactly what it is told to. Without prescribed limits there is nothing to check the setting against.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Infiltration or extravasation at the cannula site",
        description:
          "Fluid entering the tissue instead of the vein causes swelling and, with some drugs, tissue damage. Sites need checking, not just the pump.",
      },
      {
        name: "Phlebitis or local infection",
        description:
          "Prolonged cannulation and breaks in aseptic technique inflame or infect the vein.",
      },
      {
        name: "Air embolism",
        description:
          "Air left in an unprimed or disconnected line can enter the circulation and is immediately life-threatening.",
        serious: true,
      },
      {
        name: "Overdose or underdose from a rate error",
        description:
          "A misplaced decimal on a syringe pump delivers ten times the intended dose. With sedatives, opioids or insulin this can be fatal.",
        serious: true,
      },
    ],
    specialties: ["Nursing", "PrimaryCare", "Emergency"],
    legalStatus: CDSCO_C,
  },

  /* ------------------------------------------------------------ suction -- */
  suction: {
    procedure:
      "Assembled with the collection jar, tubing and the catheter sizes appropriate to the patient. The technician sets the vacuum regulator to the pressure the treating clinician has specified, tests it against a sealed finger, and takes the carer through a full suction pass including how long to apply it and when to stop.",
    preOp:
      "Suction pressure and catheter size must come from the treating clinician — both vary with the patient and with whether the airway is native or tracheostomised. A trained attendant should perform the technique.",
    postOp:
      "The collection jar is emptied and disinfected after every use, and tubing changed on the clinician's schedule. Catheters are single-use. Suction is applied on withdrawal only, never on insertion.",
    contraindications: [
      {
        name: "Untrained carer performing deep suction",
        description:
          "Deep and tracheal suction are clinical skills. Performed blind or too forcefully they cause bleeding and hypoxia.",
      },
      {
        name: "Use without a prescribed vacuum pressure",
        description:
          "Excessive pressure strips the airway lining. The regulator exists so the pressure can be set, not guessed.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Mucosal trauma and bleeding",
        description:
          "Too much pressure, too large a catheter, or suction applied on insertion damages the airway lining.",
      },
      {
        name: "Infection from a poorly reprocessed circuit",
        description:
          "Jars, tubing and catheters are direct routes into the airway when cleaning or replacement schedules slip.",
      },
      {
        name: "Hypoxia from prolonged suction passes",
        description:
          "Suction removes air along with secretions. Passes longer than about ten to fifteen seconds can desaturate an already compromised patient.",
        serious: true,
      },
      {
        name: "Vagal bradycardia or cardiac arrest",
        description:
          "Stimulating the airway can trigger a profound drop in heart rate, particularly in unwell or paediatric patients.",
        serious: true,
      },
    ],
    specialties: ["RespiratoryTherapy", "Nursing", "Emergency"],
    legalStatus: CDSCO_B,
  },

  /* ---------------------------------------------------------- furniture -- */
  furniture: {
    procedure:
      "Delivered assembled or built in the room, levelled, and positioned so that it does not obstruct access to either side of the bed or the route to the door. Castors, where fitted, are locked once placed.",
    preOp:
      "Confirm the room can take the footprint without narrowing the path to the bed or the exit. In a room that already holds a hospital bed and an oxygen source, floor space is usually the binding constraint.",
    postOp:
      "Surfaces are wiped down with a neutral detergent as part of routine room cleaning. Check castor locks and joints periodically, particularly on items a patient leans on to stand.",
    contraindications: [
      {
        name: "Use as a transfer or weight-bearing support",
        description:
          "Overbed tables, trolleys and stools are not grab rails. A patient pulling on one to stand can tip it and fall.",
      },
      {
        name: "Placement that blocks bedside or exit access",
        description:
          "Anything that narrows the route to the patient slows an emergency response and obstructs two-person transfers.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Trips and obstructed access",
        description:
          "Added furniture in an already crowded care room is a fall hazard for carers moving at night.",
      },
      {
        name: "Fall from leaning on an unlocked castor",
        description:
          "A castored item that rolls when leaned on can cause a fall and fracture in a frail patient.",
        serious: true,
      },
    ],
    specialties: ["Nursing", "Geriatric"],
    legalStatus:
      "Hospital furniture is generally outside the device classification of India's Medical Devices Rules, 2017, and is supplied as general-purpose care furniture. Encore Care claims no CDSCO approval.",
  },

  /* ----------------------------------------------------------- ICU kit -- */
  icuSetup: {
    procedure:
      "Commissioned as a system in a single three-to-four-hour visit rather than dropped off as separate boxes. The bed is assembled and levelled, the air mattress laid and set to the patient's weight, the monitor mounted and every alarm limit configured to the treating doctor's instructions, the oxygen source sited and set to the prescribed flow, and the suction machine assembled with the correct catheter sizes. The visit ends with a handover covering each device in turn.",
    preOp:
      "Configuration is agreed with the treating doctor before delivery — alarm limits, oxygen flow and suction pressure are clinical settings, not defaults. Confirm a room of at least 3.0 m × 2.5 m with access on both sides of the bed, two 16 A sockets on separate circuits, and an inverter sized for a continuous 1.5 kW load. Confirm who will provide trained attendant care.",
    postOp:
      "Breakdown replacement runs 24×7 within the service area — a replacement unit is dispatched rather than a repair scheduled. Alarm limits, oxygen flow and the turning schedule should be reviewed whenever the patient's condition changes.",
    contraindications: [
      {
        name: "No trained attendant or nursing cover",
        description:
          "A home ICU without trained hands present is not a home ICU. Equipment cannot substitute for someone who knows what the numbers mean.",
      },
      {
        name: "No power backup",
        description:
          "Concentrators, monitors and suction all stop when mains power fails. Without an inverter this setup is unsafe for a dependent patient.",
      },
      {
        name: "Patients requiring invasive ventilation",
        description:
          "A ventilator is not part of this package. It requires separate clinical assessment and a respiratory therapist handover.",
      },
      {
        name: "Rooms without two-sided bed access",
        description:
          "Turning, transfers and emergency access all need clearance on both sides.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Alarm fatigue across multiple devices",
        description:
          "Several devices alarming independently is far more wearing than one. Limits are set together at commissioning for this reason.",
      },
      {
        name: "Mucosal trauma from incorrect suction technique",
        description:
          "Excessive pressure or an oversized catheter damages the airway lining. Technique is covered at handover and should be refreshed.",
      },
      {
        name: "Healthcare-associated infection",
        description:
          "Suction circuits, catheters and humidifier water are all infection routes when reprocessing schedules slip.",
      },
      {
        name: "Loss of oxygen or suction during a power failure",
        description:
          "For a ventilated or secretion-loaded patient, an unbacked power cut is immediately life-threatening.",
        serious: true,
      },
      {
        name: "Unrecognised deterioration overnight",
        description:
          "If monitor alarms are muted or unattended, a desaturation or arrhythmia can progress unnoticed to cardiac arrest.",
        serious: true,
      },
    ],
    specialties: ["Nursing", "Pulmonary", "Emergency", "Neurologic"],
    legalStatus:
      "Supplied as a package of individually classified devices under India's Medical Devices Rules, 2017, spanning Class A to Class C; each component carries its own classification. The package itself is a coordination and commissioning service and holds no separate device classification. Encore Care claims no CDSCO approval.",
  },
  /* ------------------------------------------------- urinary catheter -- */
  urinaryCatheter: {
    procedure:
      "Inserted by a trained nurse under aseptic technique: hands washed and gloved, the meatus cleaned, sterile lubricant instilled, the catheter advanced until urine flows, then the balloon inflated with the stated volume of sterile water and the drainage bag hung below bladder level. Never inflate the balloon before urine is seen.",
    preOp:
      "The size and type are a clinical decision — a larger catheter is not a better one and causes more urethral trauma. Confirm latex allergy status before choosing a latex-based catheter.",
    postOp:
      "The bag stays below bladder level at all times, including during transfers, or urine flows back into the bladder. Meatal hygiene daily with soap and water. Catheters are changed on the clinician's schedule, not when they look dirty, and the date of insertion should be written down.",
    contraindications: [
      {
        name: "Suspected urethral injury",
        description:
          "Blood at the meatus or a pelvic fracture may indicate urethral disruption. Passing a catheter can complete a partial tear — this needs urological assessment first.",
      },
      {
        name: "Insertion by an untrained carer",
        description:
          "Urethral catheterisation is a sterile clinical procedure. Performed without training it causes trauma, false passages and infection.",
      },
      {
        name: "Latex catheters in latex allergy",
        description:
          "Latex catheters can cause a severe allergic reaction in a sensitised patient. Use an all-silicone catheter instead.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Catheter-associated urinary tract infection",
        description:
          "Risk rises with every day the catheter stays in. This is the main reason catheters are removed as soon as they are no longer needed rather than left as a convenience.",
      },
      {
        name: "Urethral trauma and bleeding",
        description:
          "From an oversized catheter, inadequate lubrication, or traction on the tube when the patient moves. Secure the tubing so it cannot pull.",
      },
      {
        name: "Bladder spasm and bypassing",
        description:
          "Leakage around the catheter is usually spasm or blockage, not a catheter that is too small. Replacing it with a larger one typically makes it worse.",
      },
      {
        name: "Urosepsis",
        description:
          "A catheter-associated infection can progress to bloodstream infection, which is life-threatening particularly in elderly and immobile patients.",
        serious: true,
      },
    ],
    specialties: ["Urologic", "Nursing", "Geriatric"],
    legalStatus:
      "Urinary catheters are notified medical devices under India's Medical Devices Rules, 2017, and are supplied sterile and single-use. Encore Care supplies them and makes no claim of CDSCO approval.",
  },

  /* ------------------------------------------------- enteral feeding -- */
  enteralFeeding: {
    procedure:
      "Placed by a trained nurse: the length is measured from nose to ear to xiphisternum and marked, the tube lubricated and passed through the nostril while the patient swallows, then the position is confirmed before anything is given. The tube is secured to the nose so it cannot migrate, and the external length is recorded.",
    preOp:
      "Tube placement must be confirmed by pH testing of the aspirate, or by X-ray where the clinician requires it. The 'whoosh test' — pushing air in and listening — is not a valid check and has caused deaths.",
    postOp:
      "Check the external marking before every feed to confirm the tube has not migrated. Flush with water before and after feeds and medication. Keep the head of the bed raised at 30–45° during feeding and for at least 30 minutes after.",
    contraindications: [
      {
        name: "Base-of-skull fracture or severe facial trauma",
        description:
          "A nasally passed tube can enter the cranial cavity through a fracture. These patients need an oral or surgically placed route.",
      },
      {
        name: "Feeding before tube position is confirmed",
        description:
          "A tube that has passed into the lung looks and feels identical from outside. Feeding into it is fatal, which is why pH or X-ray confirmation is mandatory rather than advisory.",
      },
      {
        name: "Oesophageal varices or stricture",
        description:
          "Passing a tube past varices risks catastrophic bleeding; a stricture risks perforation. Both need specialist assessment first.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Nasal and pharyngeal discomfort or ulceration",
        description:
          "Pressure from the tube against the nostril causes soreness and, over time, skin breakdown. Re-tape in a slightly different position daily.",
      },
      {
        name: "Tube blockage",
        description:
          "From thick feed or crushed medication. Flush with water before and after everything that goes down the tube.",
      },
      {
        name: "Aspiration pneumonia",
        description:
          "Feed entering the lungs — from a displaced tube, or from feeding a patient lying flat — causes pneumonia and can be fatal.",
        serious: true,
      },
      {
        name: "Feeding into the respiratory tract",
        description:
          "If an unconfirmed tube has passed into the lung, feed delivered into it is immediately life-threatening.",
        serious: true,
      },
    ],
    specialties: ["Nursing", "Gastroenterologic", "Geriatric"],
    legalStatus:
      "Enteral feeding tubes are notified medical devices under India's Medical Devices Rules, 2017, supplied sterile and single-use. Encore Care claims no CDSCO approval.",
  },

  /* ----------------------------------------------------------- PPE -- */
  ppe: {
    procedure:
      "Hands are washed before gloves go on and after they come off — gloves supplement hand hygiene, they do not replace it. Masks cover nose and mouth with the nose clip moulded to the bridge, and are handled by the straps only. Both are removed without touching the outer surface and disposed of immediately.",
    postOp:
      "Gloves are changed between tasks on the same patient, not just between patients — moving from a catheter bag to a feed with the same gloves transfers exactly what the gloves were meant to stop. Masks are replaced when damp.",
    contraindications: [
      {
        name: "Latex gloves where anyone involved has a latex allergy",
        description:
          "Latex sensitivity affects carers as well as patients, and reactions worsen with repeated exposure. Nitrile is the default where allergy status is unknown.",
      },
      {
        name: "Reuse of single-use gloves or masks",
        description:
          "Washing and reusing examination gloves damages the barrier invisibly. A reused item provides false confidence rather than protection.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Contact dermatitis and skin irritation",
        description:
          "From prolonged glove use, trapped moisture, or latex sensitivity. Powder-free nitrile and drying hands properly both help.",
      },
      {
        name: "Cross-contamination from gloves worn too long",
        description:
          "Gloves worn from task to task spread organisms as effectively as bare hands. The failure here is behavioural, not material.",
      },
      {
        name: "Facial pressure injury from tight mask straps",
        description:
          "Relevant for carers wearing a mask through a long shift; rotate the strap position and take breaks where it is safe to.",
      },
    ],
    specialties: ["Nursing", "PublicHealth"],
    legalStatus:
      "Examination gloves and face masks are notified medical devices under India's Medical Devices Rules, 2017. Supplied as single-use items; Encore Care claims no CDSCO approval.",
  },

  /* -------------------------------------------------- incontinence -- */
  incontinence: {
    procedure:
      "Sized by waist or hip measurement rather than by body weight, and fitted snugly enough that the leg cuffs sit in the groin crease without gapping. Tapes are positioned lower at the hips and upper tapes angled upward. The patient is rolled to change rather than dragged, which is what tears fragile skin.",
    postOp:
      "Change as soon as soiled rather than on a fixed schedule — prolonged contact with urine or stool is what causes the skin damage, and a highly absorbent product does not change that. Wash and dry the skin at every change and apply a barrier cream on intact skin.",
    contraindications: [
      {
        name: "Use in place of toileting where the patient can still be assisted",
        description:
          "A patient who can be helped to a commode should be. Defaulting to pads removes remaining continence and dignity along with it.",
      },
      {
        name: "Applying barrier cream over broken or infected skin",
        description:
          "Thick barrier products over an open area trap moisture and organisms. Broken skin needs a clinician's dressing plan, not more cream.",
      },
    ],
    adverseOutcomes: [
      {
        name: "Incontinence-associated dermatitis",
        description:
          "Red, raw skin from prolonged contact with urine or stool. It is a chemical injury, not a hygiene failure, and it precedes most pressure ulcers in incontinent patients.",
      },
      {
        name: "Fungal infection in skin folds",
        description:
          "Warm, occluded and damp conditions favour candida, particularly in the groin and under the abdomen.",
      },
      {
        name: "Skin tears during changes",
        description:
          "Dragging rather than rolling the patient shears fragile elderly skin, and the tears are slow to heal.",
      },
      {
        name: "Progression to a pressure ulcer",
        description:
          "Skin already damaged by moisture breaks down under pressure far faster, and deep ulcers require hospitalisation to treat.",
        serious: true,
      },
    ],
    specialties: ["Nursing", "Geriatric", "Dermatology"],
    legalStatus:
      "Adult incontinence products are supplied as personal care consumables and are not classified as medical devices under India's Medical Devices Rules, 2017.",
  },
} as const satisfies Record<string, MedicalProfile>;

export type ProfileKey = keyof typeof PROFILES;

/**
 * Layer product-specific clinical detail onto a family profile.
 *
 * Contraindications and adverse outcomes are appended rather than replaced —
 * a specific device never has *fewer* risks than its family, only more.
 */
export function profile(
  key: ProfileKey,
  extra?: Partial<Omit<MedicalProfile, "contraindications" | "adverseOutcomes">> & {
    contraindications?: MedicalProfile["contraindications"];
    adverseOutcomes?: MedicalProfile["adverseOutcomes"];
  },
): MedicalProfile {
  // Widened to MedicalProfile deliberately: `as const` narrows each entry to
  // its literal shape, so families that omit an optional field (ppe has no
  // preOp) would make `base.preOp` a type error on the union.
  const base: MedicalProfile = PROFILES[key];
  return {
    procedure: extra?.procedure ?? base.procedure,
    preOp: extra?.preOp ?? base.preOp,
    postOp: extra?.postOp ?? base.postOp,
    legalStatus: extra?.legalStatus ?? base.legalStatus,
    specialties: extra?.specialties ?? [...base.specialties],
    contraindications: [...base.contraindications, ...(extra?.contraindications ?? [])],
    adverseOutcomes: [...base.adverseOutcomes, ...(extra?.adverseOutcomes ?? [])],
  };
}

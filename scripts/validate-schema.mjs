/**
 * Validates the Product + MedicalDevice JSON-LD in the *built* output.
 *
 * Run after `npm run build`: `npm run validate:schema`
 *
 * This checks the shipped HTML rather than the source, so it catches anything
 * the generator drops or mangles on the way out. The vocabulary sets below were
 * verified against schema.org on 6 August 2026 — if schema.org changes, update
 * them here rather than loosening the check.
 *
 * Deliberately treated as failures:
 *   - any property outside the verified Thing / MedicalEntity / MedicalDevice /
 *     Product sets (catches invented or misremembered property names)
 *   - `recognizingAuthority` being present at all — see the note in
 *     `src/lib/types.ts`, naming CDSCO there asserts an endorsement we do not have
 *   - a missing `offers`, which would mean multi-typing has cost us the Product
 *     rich result
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", ".next/server/app");

/**
 * Both catalogues are checked. Care essentials are only multi-typed as
 * MedicalDevice where they are genuinely notified devices, so that directory is
 * marked optional: a plain Product node there is correct, not a failure.
 */
const DIRS = [
  { path: join(ROOT, "products"), requireMedicalDevice: true },
  { path: join(ROOT, "care-essentials"), requireMedicalDevice: false },
];

/** Properties verified against schema.org on 6 Aug 2026. */
const MEDICAL_DEVICE_OWN = new Set([
  "adverseOutcome",
  "contraindication",
  "postOp",
  "preOp",
  "procedure",
  "seriousAdverseOutcome",
]);
const MEDICAL_ENTITY_INHERITED = new Set([
  "code",
  "funding",
  "guideline",
  "legalStatus",
  "medicineSystem",
  "recognizingAuthority",
  "relevantSpecialty",
  "study",
]);
const THING = new Set([
  "additionalType", "alternateName", "description", "disambiguatingDescription",
  "identifier", "image", "mainEntityOfPage", "name", "owner", "potentialAction",
  "sameAs", "subjectOf", "url", "@context", "@type", "@id",
]);
/** Product-side properties, legitimate on the multi-typed node. */
const PRODUCT = new Set([
  "brand", "category", "offers", "aggregateRating", "review", "sku", "gtin",
  "additionalProperty", "isSimilarTo", "isRelatedTo", "manufacturer", "model",
  "audience", "hasMerchantReturnPolicy", "weight", "width", "height", "depth",
  "color", "material", "productID", "releaseDate", "award", "size", "keywords",
]);

const VALID_SPECIALTIES = new Set([
  "Anesthesia","Cardiovascular","CommunityHealth","Dentistry","Dermatology",
  "DietNutrition","Emergency","Endocrine","Gastroenterologic","Genetic","Geriatric",
  "Gynecologic","Hematologic","Infectious","LaboratoryScience","Midwifery",
  "Musculoskeletal","Neurologic","Nursing","Obstetric","Oncologic","Optometric",
  "Otolaryngologic","Pathology","Pediatric","PharmacySpecialty","Physiotherapy",
  "PlasticSurgery","Podiatric","PrimaryCare","Psychiatric","PublicHealth","Pulmonary",
  "Radiography","Renal","RespiratoryTherapy","Rheumatologic","SpeechPathology",
  "Surgical","Toxicologic","Urologic",
]);

let failures = 0;
const fail = (m) => { console.log("  ✗ " + m); failures++; };

let checked = 0;

for (const { path: dir, requireMedicalDevice } of DIRS) {
 for (const file of readdirSync(dir).filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(join(dir, file), "utf8");
  const blocks = [...html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/gs,
  )].map((m) => m[1]);

  const parsed = blocks
    .map((b) => { try { return JSON.parse(b.replace(/&quot;/g, '"')); } catch { return null; } })
    .filter(Boolean);

  const isType = (n, t) =>
    Array.isArray(n["@type"]) ? n["@type"].includes(t) : n["@type"] === t;

  const node = parsed.find((n) => isType(n, "MedicalDevice"));
  const productOnly = parsed.find((n) => isType(n, "Product"));

  console.log(`\n${file}`);
  checked++;

  if (!node) {
    if (requireMedicalDevice) { fail("no Product+MedicalDevice node found"); continue; }
    // A consumable that is not a notified device: verify it is a clean Product
    // and, crucially, that it did NOT sprout MedicalDevice properties anyway.
    if (!productOnly) { fail("no Product node found"); continue; }
    for (const k of MEDICAL_DEVICE_OWN) {
      if (productOnly[k] !== undefined)
        fail(`non-device item carries MedicalDevice property "${k}"`);
    }
    if (productOnly.legalStatus !== undefined)
      fail("non-device item asserts a legalStatus");
    if (!productOnly.offers) fail("Product offers missing");
    for (const banned of ["price", "priceSpecification", "lowPrice", "highPrice"]) {
      const offers = Array.isArray(productOnly.offers) ? productOnly.offers : [productOnly.offers];
      if (offers.some((o) => o[banned] !== undefined))
        fail(`offer carries "${banned}" but the site publishes no prices`);
    }
    console.log("  ✓ plain Product (correctly not typed as a medical device)");
    continue;
  }

  // Every key must belong to a verified vocabulary set.
  for (const key of Object.keys(node)) {
    if (
      !MEDICAL_DEVICE_OWN.has(key) &&
      !MEDICAL_ENTITY_INHERITED.has(key) &&
      !THING.has(key) &&
      !PRODUCT.has(key)
    ) fail(`unknown property "${key}"`);
  }

  // Required MedicalDevice coverage.
  for (const req of ["procedure", "contraindication", "relevantSpecialty", "legalStatus"]) {
    if (!node[req]) fail(`missing ${req}`);
  }

  // adverseOutcome / seriousAdverseOutcome expect MedicalEntity nodes.
  for (const prop of ["adverseOutcome", "seriousAdverseOutcome"]) {
    for (const o of node[prop] ?? []) {
      if (o["@type"] !== "MedicalEntity") fail(`${prop} member is "${o["@type"]}", expected MedicalEntity`);
      if (!o.name || !o.description) fail(`${prop} member missing name/description`);
    }
  }

  for (const c of node.contraindication ?? []) {
    if (c["@type"] !== "MedicalContraindication") fail(`contraindication member is "${c["@type"]}"`);
  }

  // Enumeration members must be @id references to real schema.org terms.
  for (const s of node.relevantSpecialty ?? []) {
    const id = s["@id"] ?? "";
    const term = id.replace("https://schema.org/", "");
    if (!id.startsWith("https://schema.org/")) fail(`relevantSpecialty not an @id ref: ${JSON.stringify(s)}`);
    else if (!VALID_SPECIALTIES.has(term)) fail(`"${term}" is not a MedicalSpecialty member`);
  }
  if (node.medicineSystem?.["@id"] !== "https://schema.org/WesternConventional")
    fail(`medicineSystem: ${JSON.stringify(node.medicineSystem)}`);

  // The deliberate omission — asserting CDSCO endorsement would be an overclaim.
  if (node.recognizingAuthority) fail("recognizingAuthority present (overclaim risk)");

  // Product side must survive multi-typing.
  if (!node.offers) fail("Product offers missing");

  // The catalogue publishes no prices, so no price may leak into the markup.
  // Marking up a figure that appears nowhere on the page is the same class of
  // violation as inventing a rating.
  const offerList = Array.isArray(node.offers) ? node.offers : [node.offers];
  for (const o of offerList) {
    for (const banned of ["price", "priceSpecification", "lowPrice", "highPrice"]) {
      if (o[banned] !== undefined) fail(`offer carries "${banned}" but the site publishes no prices`);
    }
    if (!o.businessFunction) fail("offer missing businessFunction (Sell / LeaseOut)");
  }

  const serious = node.seriousAdverseOutcome?.length ?? 0;
  const routine = node.adverseOutcome?.length ?? 0;
  console.log(
    `  ✓ ${node.contraindication.length} contraindications · ${routine} adverse · ${serious} serious · ${node.relevantSpecialty.length} specialties` +
    `${node.preOp ? " · preOp" : ""}${node.postOp ? " · postOp" : ""}${node.alternateName ? ` · ${node.alternateName.length} alt names` : ""}`,
  );
 }
}

console.log(
  failures === 0
    ? `\nAll ${checked} nodes valid.\n`
    : `\n${failures} problem(s) across ${checked} nodes.\n`,
);
process.exit(failures === 0 ? 0 : 1);

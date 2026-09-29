/**
 * Builds src/data/ncr-pincodes.ts from the India Post pincode directory.
 *
 * Run: node scripts/build-ncr-pincodes.mjs
 *
 * Every pincode and locality name on the location pages comes from here, so
 * none of it is typed from memory. Source: https://api.postalpincode.in
 *
 * Inclusion rule — CITY PROPER ONLY, not whole revenue districts. India Post's
 * `District` field is out of date: it still files Nuh, Ferozepur Jhirka and
 * Punhana under Gurgaon, Palwal and Hodal under Faridabad, and Modinagar/Hapur
 * villages under Ghaziabad. Listing every pincode by district would claim
 * service in places that are neither the city nor where equipment is
 * delivered. So each city below has an explicit pincode list, and the script
 * refuses to write the file if India Post does not confirm a pincode belongs
 * to the expected district, or if a featured locality name is not actually a
 * post office at its stated pincode.
 *
 * Delhi is the exception: every issued 110xxx pincode in Delhi state is in,
 * because the whole NCT is the home service area.
 *
 * Greater Noida note: India Post's current directory lists central Greater
 * Noida (Alpha, Knowledge Park-I) under 201310 and returns no records for
 * 201308, so 201308 is deliberately absent rather than added from memory.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "ncr-pincodes.ts");

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => String(a + i));

const CITIES = [
  {
    slug: "delhi",
    district: (po) => po.State === "Delhi",
    scan: range(110001, 110099),
    groupByDistrict: true,
    featured: [
      ["Saket", "110017"],
      ["Lajpat Nagar", "110024"],
      ["Janakpuri", "110058"],
      ["Dwarka", "110075"],
      ["Rohini", "110085"],
    ],
  },
  {
    slug: "noida",
    district: (po) => po.District === "Gautam Buddha Nagar",
    pins: ["201301", "201303", "201304", "201305", "201307", "201309", "201313"],
    featured: [
      ["Sector 16", "201301"],
      ["Sector 37", "201303"],
      ["Sector 55", "201307"],
      ["Sector 62", "201309"],
    ],
  },
  {
    slug: "greater-noida",
    district: (po) => po.District === "Gautam Buddha Nagar",
    pins: ["201306", "201310", "201312"],
    featured: [
      ["Alpha", "201310"],
      ["Knowledge Park", "201310"],
      ["Bisrakh", "201306"],
      ["Surajpur", "201306"],
    ],
  },
  {
    slug: "gurgaon",
    district: (po) => po.District === "Gurgaon" || po.District === "Gurugram",
    pins: [
      "122001", "122002", "122003", "122004", "122005", "122006", "122007",
      "122008", "122009", "122010", "122011", "122015", "122016", "122017",
      "122018", "122051", "122052", "122101",
    ],
    featured: [
      ["DLF Ph-II", "122008"],
      ["DLF Ph-III", "122010"],
      ["Sector 56", "122011"],
      ["South City II", "122018"],
      ["Palam Vihar", "122017"],
    ],
  },
  {
    slug: "ghaziabad",
    district: (po) => po.District === "Ghaziabad",
    pins: [
      "201001", "201002", "201003", "201004", "201005", "201006", "201007",
      "201009", "201010", "201011", "201012", "201013", "201014", "201015",
      "201016", "201017", "201019", "201102", "201103",
    ],
    featured: [
      ["Vaishali", "201019"],
      ["Kaushambi", "201012"],
      ["Crossing Republik", "201016"],
      ["Raj Nagar Extension", "201017"],
    ],
  },
  {
    slug: "faridabad",
    district: (po) => po.District === "Faridabad",
    pins: [
      "121001", "121002", "121003", "121004", "121005", "121006",
      "121007", "121008", "121009", "121010", "121012", "121013",
    ],
    featured: [
      ["NIT", "121001"],
      ["Sector 16", "121002"],
      ["Ballabgarh", "121004"],
      ["Surajkund", "121009"],
    ],
  },
];

const CITY_WORDS = ["Greater Noida", "Noida", "Gurgaon", "Gurugram", "Ghaziabad", "Faridabad", "Delhi"];

/** Tidy a post-office name for display without changing what it refers to. */
function clean(name) {
  let n = name.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
  for (const w of CITY_WORDS) {
    // "Noida Sector 12" -> "Sector 12", "Faridabad Sector 16a" -> "Sector 16a"
    n = n.replace(new RegExp(`^${w}\\s+(?=Sec)`, "i"), "");
    // "Factory Area Faridabad" -> "Factory Area", "Alpha Greater Noida" -> "Alpha"
    n = n.replace(new RegExp(`\\s+${w}$`, "i"), "");
  }
  n = n.replace(/^Sec-(\d)/i, "Sector $1").replace(/^Sector-/i, "Sector ").trim();
  return n;
}

async function lookup(pin, attempt = 1) {
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`, { signal: AbortSignal.timeout(25000) });
    const json = await res.json();
    return json?.[0];
  } catch (e) {
    if (attempt < 3) return lookup(pin, attempt + 1);
    throw new Error(`India Post lookup failed for ${pin}: ${e.message}`);
  }
}

async function pool(items, size, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx]);
      }
    }),
  );
  return out;
}

const data = {};
const problems = [];

for (const city of CITIES) {
  const candidates = city.scan ?? city.pins;
  const results = await pool(candidates, 8, async (pin) => [pin, await lookup(pin)]);
  const entries = [];

  for (const [pin, r] of results) {
    const offices = r?.Status === "Success" ? (r.PostOffice ?? []).filter(city.district) : [];
    if (offices.length === 0) {
      // A scanned Delhi number that simply is not issued is expected; an
      // explicitly listed pincode that India Post does not confirm is not.
      if (!city.scan) problems.push(`${city.slug}: ${pin} not confirmed by India Post for this district`);
      continue;
    }
    // Head post offices are named after the city itself ("Noida", "Ghaziabad");
    // listing the city as one of its own localities adds nothing.
    const isCityName = (n) => CITY_WORDS.some((w) => w.toLowerCase() === n.toLowerCase());
    const localities = [
      ...new Set(offices.map((o) => clean(o.Name)).filter((n) => n && !isCityName(n))),
    ];
    const entry = { pincode: pin, localities };
    if (city.groupByDistrict) {
      const counts = {};
      for (const o of offices) counts[o.District] = (counts[o.District] ?? 0) + 1;
      entry.district = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    }
    entries.push(entry);
  }

  entries.sort((a, b) => a.pincode.localeCompare(b.pincode));

  for (const [label, pin] of city.featured) {
    const entry = entries.find((e) => e.pincode === pin);
    const ok = entry?.localities.some((l) => l.toLowerCase().includes(label.toLowerCase()));
    if (!ok) problems.push(`${city.slug}: featured "${label}" is not a post office at ${pin}`);
  }

  data[city.slug] = {
    pincodes: entries,
    featured: city.featured.map(([name, pincode]) => ({ name, pincode })),
  };
  console.log(`${city.slug}: ${entries.length} pincodes`);
}

if (problems.length) {
  console.error("\nRefusing to write — India Post did not confirm:\n  " + problems.join("\n  "));
  process.exit(1);
}

const fetchedOn = new Date().toISOString().slice(0, 10);
const file = `/**
 * GENERATED by scripts/build-ncr-pincodes.mjs — do not edit by hand.
 * Source: India Post pincode directory (api.postalpincode.in), fetched ${fetchedOn}.
 * See the script header for the inclusion rule.
 */

export type PincodeEntry = {
  pincode: string;
  /** Post office names at this pincode, lightly tidied for display. */
  localities: string[];
  /** India Post district. Delhi only, where one city spans eleven districts. */
  district?: string;
};

export type CityPincodes = {
  pincodes: PincodeEntry[];
  /** Well-known localities, each verified as a post office at its pincode. */
  featured: { name: string; pincode: string }[];
};

export const NCR_PINCODES_FETCHED_ON = ${JSON.stringify(fetchedOn)};

export const NCR_PINCODES = ${JSON.stringify(data, null, 2)} as const satisfies Record<string, CityPincodes>;
`;

writeFileSync(OUT, file);
console.log(`\nwrote ${OUT}`);

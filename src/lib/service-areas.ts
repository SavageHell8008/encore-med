import "server-only";

import { NCR_PINCODES, type CityPincodes } from "@/data/ncr-pincodes";
import { NCR_CITIES, type NcrCitySlug } from "@/lib/constants";

/**
 * The full Delhi NCR service-area model: each city from `NCR_CITIES` joined
 * with its verified India Post pincodes (`src/data/ncr-pincodes.ts`, generated
 * by `scripts/build-ncr-pincodes.mjs`) and a note on what is locally different.
 *
 * `server-only` because the pincode dataset is large and client components
 * never need it — the pincode checker receives a compact lookup table as a prop.
 *
 * `15-local-seo.md`: a service-area business defines coverage by named city and
 * postal code, not a radius.
 */

export type ServiceArea = {
  slug: NcrCitySlug;
  name: string;
  /** Other names people search with — "Gurugram" for Gurgaon. */
  alsoKnownAs?: string;
  state: "Delhi" | "Haryana" | "Uttar Pradesh";
  /**
   * What is genuinely different about this city on the ground, drawn from its
   * own pincode data and housing stock. This is what stops six location pages
   * being one template with the city name swapped — the pattern Google's
   * scaled-content policy targets. Facts about the place, never invented
   * claims about the business: no per-neighbourhood delivery times and no
   * testimonials we do not have.
   */
  localNote: string;
  pincodes: CityPincodes["pincodes"];
  featured: CityPincodes["featured"];
};

const LOCAL_NOTES: Record<NcrCitySlug, string> = {
  delhi:
    "Delhi coverage spans the whole NCT, from Connaught Place and the central districts to Dwarka in the south-west and Rohini in the north-west. Older colonies often have narrow staircases and no lift, so beds arrive in sections and are assembled in the room — but a five-function ICU bed needs a service lift above the third floor. Tell us your floor and whether there is a lift when you call.",
  noida:
    "Noida is laid out in numbered sectors, and most addresses are a tower in a group-housing society. Share your sector, society and tower when you enquire — societies usually need an entry pass and a service-lift slot booked before a bed or ICU setup can go up.",
  "greater-noida":
    "Greater Noida here includes Greater Noida West (Bisrakh, 201306), which many residents think of as part of Noida — India Post files it under Greater Noida, and so do we. Central Greater Noida around Alpha and Knowledge Park is 201310.",
  gurgaon:
    "Gurugram coverage runs from the old city around Arjun Nagar and Basai Road through the DLF phases and Golf Course Road sectors to IMT Manesar (122051, 122052). High-rise societies typically require a gate pass and a lift booking for equipment deliveries, so share your tower details up front.",
  ghaziabad:
    "Ghaziabad coverage includes the trans-Hindon colonies bordering East Delhi — Vaishali, Kaushambi and Vasundhara — as well as Raj Nagar Extension, Crossing Republik, Loni (201102) and Tronica City (201103). Outer Modinagar and Hapur villages that India Post still lists under Ghaziabad are not included.",
  faridabad:
    "Faridabad coverage covers the NIT township, the numbered sectors and Ballabgarh (121004, 121006), which is part of the city. Palwal and Hodal, which India Post still files under Faridabad, are separate districts and are not included.",
};

export const SERVICE_AREAS: ServiceArea[] = NCR_CITIES.map((city) => ({
  ...city,
  localNote: LOCAL_NOTES[city.slug],
  pincodes: NCR_PINCODES[city.slug].pincodes,
  featured: NCR_PINCODES[city.slug].featured,
}));

export function getServiceArea(slug: string): ServiceArea | undefined {
  return SERVICE_AREAS.find((a) => a.slug === slug);
}

/** Total verified pincodes across Delhi NCR. */
export const NCR_PINCODE_COUNT = SERVICE_AREAS.reduce((n, a) => n + a.pincodes.length, 0);

/** Compact pincode -> city table for the client-side checker. */
export function pincodeIndex(): Record<string, { slug: string; name: string }> {
  const index: Record<string, { slug: string; name: string }> = {};
  for (const area of SERVICE_AREAS) {
    for (const p of area.pincodes) index[p.pincode] = { slug: area.slug, name: area.name };
  }
  return index;
}

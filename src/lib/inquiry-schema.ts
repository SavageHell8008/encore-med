import { z } from "zod";
import { CITY_OPTIONS } from "@/lib/constants";

/**
 * Shared between the client form and the API route so validation cannot drift.
 *
 * `08-conversion-psychology.md`: cap a lead form at 5–6 fields in a single
 * view, and defer full intake to the human conversation. This is exactly six
 * fields, one of which is pre-filled from the product page.
 */
export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That name is too long"),

  // Accepts 10-digit Indian mobile numbers with or without +91 / 0 prefixes,
  // and tolerates spaces and dashes as typed.
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .pipe(
      z
        .string()
        .regex(
          /^(?:\+?91|0)?[6-9]\d{9}$/,
          "Enter a 10-digit Indian mobile number",
        ),
    ),

  city: z.string().trim().min(1, "Select your city"),

  intent: z.enum(["rent", "buy", "not-sure"], {
    message: "Tell us whether you want to rent or buy",
  }),

  equipment: z.string().trim().min(1, "Equipment is required").max(160),

  message: z.string().trim().max(1000).optional().or(z.literal("")),

  /**
   * Honeypot. Real users never see or fill this; bots fill every input they
   * find. Cheaper and more accessible than a CAPTCHA.
   *
   * Deliberately accepts any value. It used to be `.max(0)`, which rejected a
   * filled honeypot at validation with a 400 naming `website` as the bad
   * field — telling the bot exactly what to leave blank, and making the
   * route's fake-success branch unreachable. The route checks this field
   * after parsing and silently drops the submission instead.
   */
  website: z.string().max(500).optional(),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryData = z.output<typeof inquirySchema>;

export const INTENT_OPTIONS = [
  { value: "rent", label: "Rent" },
  { value: "buy", label: "Buy" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const CITY_CHOICES = CITY_OPTIONS;

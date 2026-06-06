import { z } from "zod";

export const vendorSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),

  email: z.string().email("Enter a valid email address"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number")
    .optional()
    .or(z.literal("")),

  gstNumber: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/,
      "Invalid GST Number"
    )
    .optional()
    .or(z.literal("")),

  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Number")
    .optional()
    .or(z.literal("")),

  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),

  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z
    .string()
    .regex(/^\d{6}$/, "Enter valid 6-digit PIN code")
    .optional()
    .or(z.literal("")),

  categoryId: z.string().min(1, "Please select a category"),
});

export type VendorFormData = z.infer<typeof vendorSchema>;
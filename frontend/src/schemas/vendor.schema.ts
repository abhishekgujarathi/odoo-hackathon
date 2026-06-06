import { z } from "zod";

export const vendorSchema = z.object({
  vendorName: z.string().min(2, "Vendor name is required"),

  vendorType: z.enum([
    "Individual",
    "Company",
    "Partnership",
    "LLP",
  ]),

  category: z.enum([
    "IT Services",
    "Manufacturing",
    "Logistics",
    "Consulting",
    "Construction",
    "Healthcare",
  ]),

  contactPerson: z.string().min(2),

  email: z.string().email(),

  phone: z.string().regex(
    /^[6-9]\d{9}$/,
    "Enter valid mobile number"
  ),

  address: z.string().min(5),

  gstNumber: z.string().regex(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/,
    "Invalid GST Number"
  ),

  panNumber: z.string().regex(
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    "Invalid PAN Number"
  ),

  productsServices: z.string().min(3),
});

export type VendorFormData = z.infer<
  typeof vendorSchema
>;
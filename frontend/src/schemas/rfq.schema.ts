import { z } from "zod";

export const lineItemSchema = z.object({
  itemName: z
    .string()
    .min(2, "Item name is required"),

  quantity: z.coerce
    .number()
    .min(1, "Quantity must be at least 1"),

  unit: z
    .string()
    .min(1, "Unit is required"),
});

export const rfqSchema = z.object({
  title: z
    .string()
    .min(3, "RFQ title is required"),

  category: z
    .string()
    .min(2, "Category is required"),

  deadline: z
    .string()
    .min(1, "Deadline is required"),

  description: z
    .string()
    .min(
      10,
      "Description must be at least 10 characters"
    ),

  vendors: z
    .array(z.string())
    .min(1, "Select at least one vendor"),

  items: z
    .array(lineItemSchema)
    .min(1, "Add at least one line item"),

  attachments: z.any().optional(),
});

export type RFQFormData = z.infer<
  typeof rfqSchema
>;
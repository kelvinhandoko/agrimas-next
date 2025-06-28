import { z } from "zod";

export const salesInvoiceDetailPayloadSchema = z.object({
  id: z.string().optional(),
  salesInvoiceId: z.string({
    required_error: "sales invoice tidak boleh kosong",
  }),
  productId: z.string({ required_error: "product tidak boleh kosong" }),
  quantity: z.number({ required_error: "quantity tidak boleh kosong" }),
  price: z.number({ required_error: "price tidak boleh kosong" }),
  discount: z.number().nonnegative("diskon tidak boleh negatif").default(0),
  tax: z.number().nonnegative("pajak tidak boleh negatif").default(0),
});

export type SalesInvoiceDetailPayload = z.infer<
  typeof salesInvoiceDetailPayloadSchema
>;

import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const invoiceReturnDetailPayloadSchema = z.object({
  id: z.string().optional().describe("id detail pengembalian"),
  invoiceReturnId: z.string().describe("id pengembalian"),
  productId: z.string().describe("id produk"),
  quantity: z.number().describe("qty pengembalian"),
  price: z.number().describe("harga pengembalian"),
  note: z.string().optional().describe("note tambahan (optional)"),
});

export type InvoiceReturnDetailPayload = z.infer<
  typeof invoiceReturnDetailPayloadSchema
> &
  WithCompany;

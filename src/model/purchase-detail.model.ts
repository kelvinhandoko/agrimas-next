import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const purchaseDetailPayloadSchema = z.object({
  id: z.string().optional().describe("id pembelian detail"),
  purchaseId: z.string().describe("id pembelian"),
  productId: z.string().describe("id produk"),
  quantity: z.number().describe("jumlah barang"),
  price: z.number().describe("harga satuan"),
  discount: z.number().optional().describe("diskon (optional)"),
  ppn: z.number().nonnegative().default(0).describe("ppn (optional)"),
  discount_percent: z
    .number()
    .nonnegative()
    .max(99)
    .default(0)
    .describe("discount percent (optional)"),
});

export type PurchaseDetailPayload = z.infer<
  typeof purchaseDetailPayloadSchema
> &
  WithCompany;

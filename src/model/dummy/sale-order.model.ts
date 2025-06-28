import { z } from "zod";

import { WithCompany } from "@/server/common";

export const saleDetailPayloadSchema = z.object({
  id: z.string().optional().describe("id penjualan detail"),
  saleId: z.string().describe("id penjualan"),
  productId: z.string().describe("id produk"),
  quantity: z.number().describe("jumlah barang"),
  price: z.number().describe("harga satuan"),
  discount: z.number().optional().describe("diskon (optional)"),
  ppn: z.number().optional().describe("ppn (optional)"),
});

export const salePayloadSchema = z.object({
  id: z.string().optional().describe("id penjualan"),
  saleDate: z.date().describe("tanggal penjualan barang"),
  ref: z.string().optional().describe("no referensi penjualan (optional)"),
  note: z.string().optional().describe("note tambahan (optional)"),
  discount: z.number().nonnegative().default(0).describe("diskon (optional)"),
  ppn: z.number().nonnegative().default(0).describe("ppn (optional)"),
  customerId: z.string().describe("id customer"),
  detail: z
    .array(saleDetailPayloadSchema.omit({ saleId: true }))
    .describe("detail penjualan"),
});

export type SalePayload = z.infer<typeof salePayloadSchema> & WithCompany;

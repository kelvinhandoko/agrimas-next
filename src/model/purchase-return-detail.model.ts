import { z } from "zod";

export const purchaseReturnDetailPayloadSchema = z.object({
  id: z.string().optional().describe("id detail pengembalian"),
  purchaseReturnId: z.string().describe("id pengembalian"),
  productId: z.string().describe("id produk"),
  quantity: z.number().describe("jumlah produk"),
  price: z.number().describe("harga produk"),
  note: z.string().optional().describe("note tambahan (optional)"),
});

export type PurchaseReturnDetailPayload = z.infer<
  typeof purchaseReturnDetailPayloadSchema
>;

export const getTotalPurchaseReturnPayloadSchema = z.object({
  productId: z.string().describe("id produk"),
  supplierId: z.string().describe("id supplier"),
});

export type GetTotalPurchaseReturnPayload = z.infer<
  typeof getTotalPurchaseReturnPayloadSchema
>;

import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const purchasePaymentPayloadSchema = z.object({
  paymentDate: z.date().describe("tanggal pembayaran"),
  purchaseId: z.string().describe("id pembelian"),
  amount: z.number().describe("jumlah pembayaran"),
  note: z.string().optional().describe("note tambahan (optional)"),
  paymentMethodId: z.string().describe("id metode pembayaran"),
});

export type PurchasePaymentPayload = z.infer<
  typeof purchasePaymentPayloadSchema
> &
  WithCompany;

import { purchasePaymentPayloadSchema } from "@/model/purchase-payment.model";
import { TRANSACTION_PAYMENT_STATUS } from "@prisma/client";
import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const purchaseInvoicePayloadSchema = z.object({
  receiveItemId: z.string().describe("id surat jalan pembelian"),
  date: z.date().describe("tanggal faktur pembelian"),
  payment: purchasePaymentPayloadSchema
    .optional()
    .describe("pembayaran faktur pembelian (optional)"),
});

export type PurchaseInvoicePayload = z.infer<
  typeof purchaseInvoicePayloadSchema
> &
  WithCompany;

export const updatePurchaseInvoiceStatusSchema = z.object({
  id: z.string().describe("id faktur pembelian"),
  paymentStatus: z
    .nativeEnum(TRANSACTION_PAYMENT_STATUS)
    .describe("status pembayaran"),
});

export type UpdatedPurchaseInvoiceStatusPayload = z.infer<
  typeof updatePurchaseInvoiceStatusSchema
>;

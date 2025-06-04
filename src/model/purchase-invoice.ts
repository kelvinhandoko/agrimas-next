import { purchasePaymentPayloadSchema } from "@/model/purchase-payment.model";
import { receiveItemDetailPayloadSchema } from "@/model/receive-item-detail.model";
import { TRANSACTION_PAYMENT_STATUS } from "@prisma/client";
import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  getQuery,
  paginatedQuery,
} from "@/server/common";

export const purchaseInvoicePayloadSchema = z.object({
  receiveItemId: z.string().describe("id surat jalan pembelian"),
  date: z.date().describe("tanggal faktur pembelian"),
  ref: z.string().optional().describe("referensi"),
  discount: z.number().default(0).describe("diskon"),
  tax: z.number().default(0).describe("pajak"),
  note: z.string().optional().describe("catatan"),
  payment: purchasePaymentPayloadSchema
    .optional()
    .describe("pembayaran faktur pembelian (optional)"),
  details: z.array(
    receiveItemDetailPayloadSchema.omit({ receiveItemId: true }),
  ),
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

export const getPurchaseInvoiceQuerySchema = getQuery.extend({
  supplierId: z.string().optional().describe("id supplier"),
});

export type GetPurchaseInvoiceQuery = z.infer<
  typeof getPurchaseInvoiceQuerySchema
> &
  WithCompany;

export const paginatedPurchaseInvoiceQuerySchema = paginatedQuery.merge(
  getPurchaseInvoiceQuerySchema,
);

export type PaginatedPurchaseInvoiceQuery = z.infer<
  typeof paginatedPurchaseInvoiceQuerySchema
> &
  WithCompany;

export const cursorPurchaseInvoiceQuerySchema = cursorQuery.merge(
  getPurchaseInvoiceQuerySchema,
);

export type CursorPurchaseInvoiceQuery = z.infer<
  typeof cursorPurchaseInvoiceQuerySchema
> &
  WithCompany;

import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  getQuery,
  paginatedQuery,
} from "@/server/common";

export const purchasePaymentPayloadSchema = z.object({
  paymentDate: z.date().describe("tanggal pembayaran"),
  purchaseInvoiceId: z.string().describe("id faktur pembelian"),
  amount: z.number().describe("jumlah pembayaran"),
  note: z.string().optional().describe("note tambahan (optional)"),
  paymentMethodId: z.string().describe("id metode pembayaran"),
});

export type PurchasePaymentPayload = z.infer<
  typeof purchasePaymentPayloadSchema
> &
  WithCompany;

export const getPurchasePaymentQuerySchema = getQuery.extend({
  purchaseInvoiceId: z.string().optional().describe("id faktur pembelian"),
  paymentMethodId: z.string().optional().describe("id metode pembayaran"),
});

export type GetPurchasePaymentQuery = z.infer<
  typeof getPurchasePaymentQuerySchema
> &
  WithCompany;

export const paginatedPurchasePaymentQuerySchema =
  getPurchasePaymentQuerySchema.merge(paginatedQuery);

export type PaginatedPurchasePaymentQuery = z.infer<
  typeof paginatedPurchasePaymentQuerySchema
> &
  WithCompany;

export const cursoredPurchasePaymentQuerySchema =
  getPurchasePaymentQuerySchema.merge(cursorQuery);

export type CursoredPurchasePaymentQuery = z.infer<
  typeof cursoredPurchasePaymentQuerySchema
> &
  WithCompany;

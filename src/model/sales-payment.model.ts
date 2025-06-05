import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  dateRangeSchema,
  getQuery,
  paginatedQuery,
} from "@/server/common";

export const salesPaymentPayload = z.object({
  id: z.string().optional(),
  date: z.date({ required_error: "tanggal pembayaran wajib diisi" }),
  amount: z.number().positive("jumlah minimal 1"),
  paymentMethodId: z
    .string({
      required_error: "metode pembayaran wajib diisi",
    })
    .min(1, "metode pembayaran wajib diisi"),
  salesInvoiceId: z
    .string({ required_error: "faktur penjualan wajib diisi" })
    .min(1, "faktur penjualan wajib diisi"),
});

export type SalesPaymentPayload = z.infer<typeof salesPaymentPayload> &
  WithCompany;

export const getSalesPaymentQuerySchema = getQuery.extend({
  salesInvoiceId: z.string(),
  dateRange: dateRangeSchema.optional(),
});

export type GetSalesPaymentQuery = z.infer<typeof getSalesPaymentQuerySchema>;

export const paginatedSalesPaymentQuerySchema = paginatedQuery.merge(
  getSalesPaymentQuerySchema,
);

export type PaginatedSalesPayment = z.infer<
  typeof paginatedSalesPaymentQuerySchema
>;

export const getSalesPaymentInfiniteQuerySchema = cursorQuery.merge(
  getSalesPaymentQuerySchema,
);

export type GetSalesPaymentInfiniteQuery = z.infer<
  typeof getSalesPaymentInfiniteQuerySchema
>;

import { invoiceReturnDetailPayloadSchema } from "@/model/invoice-return-detail.model";
import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  getQuery,
  paginatedQuery,
} from "@/server/common";

export const invoiceReturnPayloadSchema = z.object({
  id: z.string().optional().describe("id pengembalian"),
  date: z.date().describe("tanggal pengembalian"),
  ref: z.string().describe("ref pengembalian").optional(),
  note: z.string().optional().describe("note tambahan (optional)"),
  customerId: z.string().describe("id customer"),
  detail: z
    .array(invoiceReturnDetailPayloadSchema.omit({ invoiceReturnId: true }))
    .describe("detail pengembalian"),
});

export type InvoiceReturnPayload = z.infer<typeof invoiceReturnPayloadSchema> &
  WithCompany;

export const getInvoiceReturnQuerySchema = getQuery.extend({
  customerId: z.string().optional(),
});

export type GetInvoiceReturnQuery = z.infer<
  typeof getInvoiceReturnQuerySchema
> &
  WithCompany;

export const paginatedInvoiceReturnQuerySchema = paginatedQuery.merge(
  getInvoiceReturnQuerySchema,
);
export type PaginatedInvoiceReturnQuery = z.infer<
  typeof paginatedInvoiceReturnQuerySchema
> &
  WithCompany;

export const cursoredInvoiceReturnQuerySchema = cursorQuery.merge(
  getInvoiceReturnQuerySchema,
);

export type CursoredInvoiceReturnQuery = z.infer<
  typeof cursoredInvoiceReturnQuerySchema
> &
  WithCompany;

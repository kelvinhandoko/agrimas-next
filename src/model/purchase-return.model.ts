import { purchaseReturnDetailPayloadSchema } from "@/model/purchase-return-detail.model";
import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  getQuery,
  paginatedQuery,
} from "@/server/common";

export const purchaseReturnPayloadSchema = z.object({
  id: z.string().optional().describe("id pengembalian"),
  date: z.date().describe("tanggal pengembalian"),
  ref: z.string().describe("ref pengembalian").optional(),
  note: z.string().optional().describe("note tambahan (optional)"),
  supplierId: z.string().describe("id supplier"),
  detail: z
    .array(purchaseReturnDetailPayloadSchema.omit({ purchaseReturnId: true }))
    .describe("detail pengembalian"),
});

export type PurchaseReturnPayload = z.infer<
  typeof purchaseReturnPayloadSchema
> &
  WithCompany;

export const getPurchaseReturnQuerySchema = getQuery.extend({
  supplierId: z.string().optional(),
});

export type GetPurchaseReturnQuery = z.infer<
  typeof getPurchaseReturnQuerySchema
> &
  WithCompany;

export const paginatedPurchaseReturnSchema =
  getPurchaseReturnQuerySchema.merge(paginatedQuery);

export type PaginatedPurchaseReturnQuery = z.infer<
  typeof paginatedPurchaseReturnSchema
> &
  WithCompany;

export const cursoredPurchaseReturnQuerySchema =
  getPurchaseReturnQuerySchema.merge(cursorQuery);

export type CursoredPurchaseReturnQuery = z.infer<
  typeof cursoredPurchaseReturnQuerySchema
> &
  WithCompany;

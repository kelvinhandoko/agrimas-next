import { purchaseDetailPayloadSchema } from "@/model/purchase-detail.model";
import { type Prisma, TRANSACTION_STATUS } from "@prisma/client";
import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  getQuery,
  paginatedQuery,
} from "@/server/common";

type PurchaseInclude<T> = {
  include?: Prisma.Subset<T, Prisma.PurchaseInclude>;
};

export const purchasePayloadSchema = z.object({
  id: z.string().optional().describe("id pembelian"),
  purchaseDate: z.date().describe("tanggal pembelian barang"),
  ref: z.string().optional().describe("no referensi pembelian (optional)"),
  note: z.string().optional().describe("note tambahan (optional)"),
  dueDate: z.date(),
  discount: z.number().nonnegative().default(0).describe("diskon (optional)"),
  ppn: z.number().nonnegative().default(0).describe("ppn (optional)"),
  supplierId: z.string().describe("id supplier"),
  detail: z
    .array(purchaseDetailPayloadSchema.omit({ purchaseId: true }))
    .describe("detail pembelian"),
});

export type PurchasePayload = z.infer<typeof purchasePayloadSchema> &
  WithCompany;

export const updatePurchaseStatusSchema = z.object({
  id: z.string().describe("id pembelian"),
  status: z.nativeEnum(TRANSACTION_STATUS).describe("status pembelian"),
});

export type UpdatePurchaseStatusPayload = z.infer<
  typeof updatePurchaseStatusSchema
>;

export const purchaseDetailQuerySchema = z.object({
  id: z.string().describe("id pembelian"),
});

export type PurchaseDetailQuery<T> = z.infer<typeof purchaseDetailQuerySchema> &
  PurchaseInclude<T>;

export const GetAllPurchaseQuerySchema = getQuery;

export type GetAllPurchaseQuery = z.infer<typeof GetAllPurchaseQuerySchema> &
  WithCompany;

export const paginatedPurchaseQuerySchema = paginatedQuery.merge(
  GetAllPurchaseQuerySchema,
);

export type PaginatedPurchaseQuery = z.infer<
  typeof paginatedPurchaseQuerySchema
> &
  WithCompany;

export const cursorPurchaseQuerySchema = cursorQuery.merge(
  GetAllPurchaseQuerySchema,
);

export type CursorPurchaseQuery = z.infer<typeof cursorPurchaseQuerySchema> &
  WithCompany;

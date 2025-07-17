import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  getQuery,
  paginatedQuery,
} from "@/server/common";

export const receiveItemDetailPayloadSchema = z.object({
  id: z.string().optional().describe("id detail penerimaan"),
  receiveItemId: z.string().describe("id penerimaan"),
  purchaseDetailId: z.string().describe("id detail pembelian"),
  productId: z.string().describe("id produk"),
  productName: z.string(),
  note: z.string().nullish(),
  price: z
    .number()
    .nonnegative("harga tidak boleh kurang dari 0")
    .describe("harga"),
  discount: z
    .number()
    .nonnegative("diskon tidak boleh kurang dari 0")
    .default(0)
    .describe("diskon"),
  tax: z
    .number()
    .nonnegative("ppn tidak boleh kurang dari 0")
    .default(0)
    .describe("ppn"),
  maxQuantity: z
    .number()
    .nonnegative("jumlah tidak boleh kurang dari 0")
    .describe("jumlah diterima"),
  totalReceive: z
    .number()
    .nonnegative("jumlah tidak boleh kurang dari 0")
    .describe("jumlah diterima"),
  quantity: z
    .number()
    .nonnegative("jumlah tidak boleh kurang dari 0")
    .describe("jumlah"),
});

export type ReceiveItemDetailPayload = z.infer<
  typeof receiveItemDetailPayloadSchema
> & {
  purchaseId: string;
};

export const getReceiveItemDetailPayloadSchema = z.object({
  id: z.string().describe("id detail penerimaan"),
});

export const getReceiveItemDetailQuerySchema = getQuery.extend({
  receiveId: z.string().describe("id penerimaan"),
});

export type GetReceiveItemDetailQuery = z.infer<
  typeof getReceiveItemDetailQuerySchema
> &
  WithCompany;

export const paginatedReceiveItemDetailQuerySchema =
  getReceiveItemDetailQuerySchema.merge(paginatedQuery);

export type PaginatedReceiveItemDetailQuery = z.infer<
  typeof paginatedReceiveItemDetailQuerySchema
> &
  WithCompany;

export const cursoredReceiveItemDetailQuerySchema = cursorQuery.merge(
  getReceiveItemDetailQuerySchema,
);
export type CursoredReceiveItemDetailQuery = z.infer<
  typeof cursoredReceiveItemDetailQuerySchema
> &
  WithCompany;

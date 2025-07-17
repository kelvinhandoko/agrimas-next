import { z } from "zod";

import { cursorQuery, getQuery, paginatedQuery } from "@/server/common";

export const soldProductPayloadSchema = z.object({
  id: z.string().optional().describe("id penjualan"),
  customerId: z.string().describe("id customer"),
  productId: z.string().describe("id produk"),
  totalSold: z.number().describe("total penjualan"),
});

export type SoldProductPayload = z.infer<typeof soldProductPayloadSchema>;

export const updateSoldProductPayloadSchema = z.object({
  id: z.string().describe("id penjualan"),
  customerId: z.string().optional().describe("id customer"),
  quantity: z.number().optional().describe("total penjualan"),
  return: z.number().optional().describe("total return"),
});

export type UpdateSoldProductPayload = z.infer<
  typeof updateSoldProductPayloadSchema
>;

export const getSoldProductQuerySchema = getQuery.extend({
  productId: z.string().optional().describe("id produk"),
  customerId: z.string().optional().describe("id customer"),
});

export type GetSoldProductQuery = z.infer<typeof getSoldProductQuerySchema>;

export const paginatedSoldProductQuerySchema =
  getSoldProductQuerySchema.merge(paginatedQuery);

export type PaginatedSoldProductQuery = z.infer<
  typeof paginatedSoldProductQuerySchema
>;

export const cursoredSoldProductQuerySchema =
  getSoldProductQuerySchema.merge(cursorQuery);

export type CursoredSoldProductQuery = z.infer<
  typeof cursoredSoldProductQuerySchema
>;

export const findDetailSoldProductQuerySchema = z.object({
  type: z.enum(["id", "customer_product"]).default("id"),
  identifier: z.union([
    z.string(),
    z.object({
      customerId: z.string(),
      productId: z.string(),
    }),
  ]),
});

export type FindDetailSoldProductQuery = z.infer<
  typeof findDetailSoldProductQuerySchema
>;

export const handleSoldProductQuerySchema =
  updateSoldProductPayloadSchema.extend({
    productId: z.string().optional().describe("id produk"),
  });

export type HandleSoldProductQuery = z.infer<
  typeof handleSoldProductQuerySchema
>;

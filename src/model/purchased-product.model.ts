import { z } from "zod";

import { cursorQuery, getQuery, paginatedQuery } from "@/server/common";

export const purchasedProductPayloadSchema = z.object({
  id: z.string().optional().describe("id penjualan"),
  supplierId: z.string().describe("id supplier"),
  productId: z.string().describe("id produk"),
  totalPurchase: z.number().describe("total penjualan"),
});

export type PurchasedProductPayload = z.infer<
  typeof purchasedProductPayloadSchema
>;

export const updatePurchasedProductPayloadSchema = z.object({
  id: z.string().describe("id penjualan"),
  supplierId: z.string().optional().describe("id supplier"),
  quantity: z.number().optional().describe("total penjualan"),
  return: z.number().optional().describe("total return"),
});

export type UpdatePurchasedProductPayload = z.infer<
  typeof updatePurchasedProductPayloadSchema
>;

export const getPurchasedProductQuerySchema = getQuery.extend({
  productId: z.string().optional().describe("id produk"),
  supplierId: z.string().optional().describe("id supplier"),
});

export type GetPurchasedProductQuery = z.infer<
  typeof getPurchasedProductQuerySchema
>;

export const paginatedPurchasedProductQuerySchema =
  getPurchasedProductQuerySchema.merge(paginatedQuery);

export type PaginatedPurchasedProductQuery = z.infer<
  typeof paginatedPurchasedProductQuerySchema
>;

export const cursoredPurchasedProductQuerySchema =
  getPurchasedProductQuerySchema.merge(cursorQuery);

export type CursoredPurchasedProductQuery = z.infer<
  typeof cursoredPurchasedProductQuerySchema
>;

export const findDetailPurchasedProductQuerySchema = z.object({
  type: z.enum(["id", "supplier_product"]).default("id"),
  identifier: z.union([
    z.string(),
    z.object({
      supplierId: z.string(),
      productId: z.string(),
    }),
  ]),
});

export type FindDetailPurchasedProductQuery = z.infer<
  typeof findDetailPurchasedProductQuerySchema
>;

export const handlePurchasedProductQuerySchema =
  updatePurchasedProductPayloadSchema
    .extend({
      productId: z.string().optional().describe("id produk"),
    })
    .omit({ id: true });

export type HandlePurchasedProductQuery = z.infer<
  typeof handlePurchasedProductQuerySchema
>;

import { z } from "zod";

import { type WithCompany, basicQuery } from "@/server/common";

export const productPayloadSchema = z.object({
  name: z.string().trim().min(1, "nama produk wajib diisi"),
  supplierId: z.string(),
  quantity: z
    .number()
    .nonnegative("quantity tidak boleh lebih kecil dari 0")
    .optional(),
  price: z
    .number()
    .nonnegative("harga tidak boleh lebih kecil dari 0")
    .optional(),
  id: z.string().optional(),
  sellingPrice: z
    .number()
    .nonnegative("harga jual tidak boleh lebih kecil dari 0"),
});

export type ProductPayload = z.infer<typeof productPayloadSchema> & WithCompany;

export const getAllProductQuerySchema = basicQuery.extend({
  needQuantity: z.boolean().default(false),
  supplierId: z.string().optional().describe("id supplier"),
});

export type GetAllProductQuery = z.infer<typeof getAllProductQuerySchema> &
  WithCompany;

export const updateProductStatsSchema = z.object({
  productId: z.string(),
  prevQuantity: z
    .number()
    .nonnegative("quantity tidak boleh lebih kecil dari 0")
    .describe("quantity sebelum diubah"),
  currentQuantity: z.number().describe("quantity saat ini"),
  prevAveragePrice: z
    .number()
    .nonnegative("harga rata-rata tidak boleh lebih kecil dari 0")
    .describe("harga rata-rata sebelum diubah"),
  prevPrice: z
    .number()
    .nonnegative("harga tidak boleh lebih kecil dari 0")
    .describe("harga sebelum diubah (dipakai saat update)"),
  currentPrice: z
    .number()
    .nonnegative("harga tidak boleh lebih kecil dari 0")
    .describe("harga saat ini"),
});

export type UpdateProductStats = z.infer<typeof updateProductStatsSchema>;

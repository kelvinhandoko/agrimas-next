import { type WithCompany, basicQuery } from "@/server";
import { z } from "zod";

export const productPayloadSchema = z.object({
  name: z.string().trim().min(1, "nama produk wajib diisi"),
  supplierId: z.string(),
  quantity: z.number().nonnegative("quantity tidak boleh lebih kecil dari 0"),
  price: z.number().nonnegative("harga tidak boleh lebih kecil dari 0"),
  id: z.string().optional(),
});

export type ProductPayload = z.infer<typeof productPayloadSchema> & WithCompany;

export const getAllProductQuerySchema = basicQuery;

export type GetAllProductQuery = z.infer<typeof getAllProductQuerySchema> &
  WithCompany;

export const updateProductStatsSchema = z.object({
  productId: z.string(),
  beforeQuantity: z
    .number()
    .nonnegative("quantity tidak boleh lebih kecil dari 0"),
  afterQQuantity: z
    .number()
    .nonnegative("quantity tidak boleh lebih kecil dari 0"),
});

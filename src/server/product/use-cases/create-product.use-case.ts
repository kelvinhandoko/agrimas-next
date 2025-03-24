import { type ProductPayload } from "@/model/product.model";
import { TRPCError } from "@trpc/server";

import { type ProductRepository } from "@/server/product/product.repository";

export const createProductUseCase =
  (productRepo: ProductRepository) => async (payload: ProductPayload) => {
    const findProduct = await productRepo.isExists({
      name: payload.name,
      companyId: payload.companyId,
      supplierId: payload.supplierId,
    });
    if (findProduct) {
      throw new TRPCError({
        code: "CONFLICT",
        message: `produk ${payload.name} sudah dibuat sebelumnya`,
      });
    }
    return await productRepo.create(payload);
  };

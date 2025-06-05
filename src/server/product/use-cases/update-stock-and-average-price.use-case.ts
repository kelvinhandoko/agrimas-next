import { type UpdateProductStats } from "@/model/product.model";
import { TRPCError } from "@trpc/server";

import { type ProductRepository } from "@/server/product/product.repository";

export const updateStockAndAveragePriceUseCase =
  (productRepo: ProductRepository) => async (payload: UpdateProductStats) => {
    if (payload.currentQuantity < 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "stock tidak boleh kurang dari 0",
      });
    }
    return await productRepo.updateStockAndAverage(payload);
  };

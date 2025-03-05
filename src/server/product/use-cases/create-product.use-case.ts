import { type ProductPayload } from "@/model/product.model";

import { type ProductRepository } from "@/server/product/product.repository";

export const createProductUseCase =
  (productRepo: ProductRepository) => async (payload: ProductPayload) => {
    return await productRepo.create(payload);
  };

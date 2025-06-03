import { type ProductPayload } from "@/model/product.model";

import { type ProductRepository } from "@/server/product/product.repository";

export const updateProductUseCase =
  (repo: ProductRepository) => async (payload: ProductPayload) =>
    await repo.update(payload);

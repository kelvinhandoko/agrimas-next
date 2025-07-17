import { type SoldProductPayload } from "@/model/sold-product.model";

import { type SoldProductRepository } from "@/server/soldProduct/sold-product.repository";

export const createSoldProductUseCase =
  (repo: SoldProductRepository) => async (payload: SoldProductPayload) => {
    return await repo.create(payload);
  };

export type ICreateSoldProductUseCase = ReturnType<
  typeof createSoldProductUseCase
>;

import { type UpdateSoldProductPayload } from "@/model/sold-product.model";

import { type SoldProductRepository } from "@/server/soldProduct/sold-product.repository";

export const updateSoldProductUseCase =
  (repo: SoldProductRepository) => async (payload: UpdateSoldProductPayload) =>
    await repo.update(payload);

export type IUpdateSoldProductUseCase = ReturnType<
  typeof updateSoldProductUseCase
>;

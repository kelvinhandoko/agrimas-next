import { type FindDetailSoldProductQuery } from "@/model/sold-product.model";

import { type SoldProductRepository } from "@/server/soldProduct/sold-product.repository";

export const findSoldProductUseCase =
  (repo: SoldProductRepository) =>
  async (payload: FindDetailSoldProductQuery) => {
    return await repo.find(payload);
  };

export type IFindSoldProductUseCase = ReturnType<typeof findSoldProductUseCase>;

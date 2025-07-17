import { type CursoredSoldProductQuery } from "@/model/sold-product.model";

import { type SoldProductRepository } from "@/server/soldProduct/sold-product.repository";

export const getInfiniteSoldProductUseCase =
  (repo: SoldProductRepository) => async (payload: CursoredSoldProductQuery) =>
    await repo.getInfinite(payload);

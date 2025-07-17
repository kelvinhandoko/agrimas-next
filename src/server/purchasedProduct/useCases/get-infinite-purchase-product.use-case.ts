import { type CursoredPurchasedProductQuery } from "@/model/purchased-product.model";

import { type PurchasedProductRepository } from "@/server/purchasedProduct/purchased-product.repository";

export const getInfinitePurchasedProductUseCase =
  (repo: PurchasedProductRepository) =>
  async (query: CursoredPurchasedProductQuery) => {
    return await repo.getInfinite(query);
  };

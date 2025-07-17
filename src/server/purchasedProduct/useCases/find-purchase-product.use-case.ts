import { type FindDetailPurchasedProductQuery } from "@/model/purchased-product.model";

import { type PurchasedProductRepository } from "@/server/purchasedProduct/purchased-product.repository";

export const findPurchasedProductUseCase =
  (repo: PurchasedProductRepository) =>
  async (payload: FindDetailPurchasedProductQuery) => {
    return await repo.find(payload);
  };

export type IFindPurchasedProductUseCase = ReturnType<
  typeof findPurchasedProductUseCase
>;

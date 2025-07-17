import { type PurchasedProductPayload } from "@/model/purchased-product.model";

import { type PurchasedProductRepository } from "@/server/purchasedProduct/purchased-product.repository";

export const createPurchasedProductUseCase =
  (repo: PurchasedProductRepository) =>
  async (payload: PurchasedProductPayload) => {
    return await repo.create(payload);
  };

export type ICreatePurchasedProductUseCase = ReturnType<
  typeof createPurchasedProductUseCase
>;

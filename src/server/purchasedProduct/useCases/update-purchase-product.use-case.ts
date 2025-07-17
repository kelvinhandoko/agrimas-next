import { type UpdatePurchasedProductPayload } from "@/model/purchased-product.model";

import { type PurchasedProductRepository } from "@/server/purchasedProduct/purchased-product.repository";

export const UpdatePurchasedProductUseCase =
  (repo: PurchasedProductRepository) =>
  async (payload: UpdatePurchasedProductPayload) =>
    await repo.update(payload);

export type IUpdatePurchasedProductUseCase = ReturnType<
  typeof UpdatePurchasedProductUseCase
>;

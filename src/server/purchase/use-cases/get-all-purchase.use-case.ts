import { type PaginatedPurchaseQuery } from "@/model/purchase.model";

import { type PurchaseRepository } from "@/server/purchase/purchase.repository";

export const getAllPurchaseUseCase =
  (purchaseRepo: PurchaseRepository) =>
  async (query: PaginatedPurchaseQuery) => {
    return await purchaseRepo.get(query);
  };

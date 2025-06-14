import { type CursorPurchaseQuery } from "@/model/purchase.model";

import { type PurchaseRepository } from "@/server/purchase/purchase.repository";

export const getInfinitePurchaseUseCase =
  (purchaseRepo: PurchaseRepository) => async (query: CursorPurchaseQuery) => {
    return await purchaseRepo.getInfinite(query);
  };

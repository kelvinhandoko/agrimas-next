import { type UpdatePurchaseStatusPayload } from "@/model/purchase.model";

import { type PurchaseRepository } from "@/server/purchase/purchase.repository";

export const updatePurcahseStatusUseCase =
  (purchaseRepo: PurchaseRepository) =>
  async (payload: UpdatePurchaseStatusPayload) => {
    return await purchaseRepo.updateStatus(payload);
  };

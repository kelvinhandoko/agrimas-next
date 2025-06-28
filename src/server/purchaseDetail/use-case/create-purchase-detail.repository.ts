import { type PurchaseDetailPayload } from "@/model/purchase-detail.model";

import { type PurchaseDetailRepository } from "@/server/purchaseDetail/purchase-detail.repository";

export const createPurchaseDetailUseCase =
  (purchaseDetailRepo: PurchaseDetailRepository) =>
  async (payload: PurchaseDetailPayload) => {
    return await purchaseDetailRepo.create(payload);
  };

import { type PurchaseReturnDetailPayload } from "@/model/purchase-return-detail.model";

import { type PurchaseReturnDetailRepository } from "@/server/purchaseReturnDetail/purchase-return-detail.repository";

export const createPurchaseReturnDetailUseCase =
  (model: PurchaseReturnDetailRepository) =>
  async (payload: PurchaseReturnDetailPayload) =>
    await model.create(payload);

export type CreatePurchaseReturnDetailUseCase = ReturnType<
  Awaited<typeof createPurchaseReturnDetailUseCase>
>;

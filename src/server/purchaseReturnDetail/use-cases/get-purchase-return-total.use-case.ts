import { type GetTotalPurchaseReturnPayload } from "@/model/purchase-return-detail.model";

import { type PurchaseReturnDetailRepository } from "@/server/purchaseReturnDetail/purchase-return-detail.repository";

export const getPurchaseReturnTotalUseCase =
  (model: PurchaseReturnDetailRepository) =>
  async (payload: GetTotalPurchaseReturnPayload) =>
    await model.getTotal(payload.supplierId, payload.productId);

export type GetPurchaseReturnTotalUseCase = ReturnType<
  Awaited<typeof getPurchaseReturnTotalUseCase>
>;

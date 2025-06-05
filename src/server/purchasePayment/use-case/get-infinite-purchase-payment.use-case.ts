import { type CursoredPurchasePaymentQuery } from "@/model/purchase-payment.model";

import { type PurchasePaymentRepository } from "@/server/purchasePayment/purchase-payment.repository";

export const getInfinitePurchasePaymentUseCase =
  (repo: PurchasePaymentRepository) =>
  async (q: CursoredPurchasePaymentQuery) =>
    await repo.getInfinite(q);

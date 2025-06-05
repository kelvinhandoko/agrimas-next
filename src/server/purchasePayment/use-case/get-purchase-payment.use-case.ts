import { type PaginatedPurchasePaymentQuery } from "@/model/purchase-payment.model";

import { type PurchasePaymentRepository } from "@/server/purchasePayment/purchase-payment.repository";

export const getPurchasePaymentUseCase =
  (repo: PurchasePaymentRepository) =>
  async (q: PaginatedPurchasePaymentQuery) =>
    await repo.get(q);

import { type PurchasePaymentPayload } from "@/model/purchase-payment.model";

import { type PurchasePaymentRepository } from "@/server/purchasePayment/purchase-payment.repository";

export const createPurchasePaymentUseCase =
  (purchasePaymentRepo: PurchasePaymentRepository) =>
  async (payload: PurchasePaymentPayload) => {
    return await purchasePaymentRepo.create(payload);
  };

import { type CursorQuery } from "@/server/common";
import { type PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";

export const getInfinitePaymentMethodUseCase =
  (repo: PaymentMethodRepository) => async (payload: CursorQuery) =>
    await repo.getInfinite(payload);

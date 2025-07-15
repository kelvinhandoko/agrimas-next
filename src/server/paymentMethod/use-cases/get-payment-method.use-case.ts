import { type PaginatedQuery } from "@/server/common";
import { type PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";

export const getPaymentMethodUseCase =
  (repo: PaymentMethodRepository) => async (payload: PaginatedQuery) =>
    await repo.get(payload);

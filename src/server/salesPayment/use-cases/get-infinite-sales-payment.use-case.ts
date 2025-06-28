import { type GetSalesPaymentInfiniteQuery } from "@/model/sales-payment.model";

import { type SalesPaymentRepository } from "@/server/salesPayment/sales-payment.repository";

export const getInfiniteSalesPaymentUseCase =
  (repo: SalesPaymentRepository) => async (q: GetSalesPaymentInfiniteQuery) =>
    await repo.getInfinite(q);

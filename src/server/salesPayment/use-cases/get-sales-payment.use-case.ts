import { type PaginatedSalesPayment } from "@/model/sales-payment.model";

import { type SalesPaymentRepository } from "@/server/salesPayment/sales-payment.repository";

export const getSalesPaymentUseCase =
  (repo: SalesPaymentRepository) => async (q: PaginatedSalesPayment) =>
    await repo.get(q);

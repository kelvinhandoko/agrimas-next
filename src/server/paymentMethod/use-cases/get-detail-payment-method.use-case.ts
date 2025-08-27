import { type GetDetailPaymentMethodQuery } from "@/model/payment-method.model";
import { TRPCError } from "@trpc/server";

import { type PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";

export const getDetailPaymentMethodUseCase =
  (repo: PaymentMethodRepository) => async (q: GetDetailPaymentMethodQuery) => {
    const data = await repo.getDetail(q);
    if (!data)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "tidak ditemukan metode pembayaran",
      });
    return data;
  };

export type IGetDetailPaymentMethodUseCase = ReturnType<
  typeof getDetailPaymentMethodUseCase
>;

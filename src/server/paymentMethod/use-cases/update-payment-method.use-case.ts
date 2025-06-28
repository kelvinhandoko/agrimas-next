import { type PaymentMethodPayload } from "@/model/payment-method.model";
import { TRPCError } from "@trpc/server";

import { type PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";

export const updatePaymentMethodUseCase =
  (repo: PaymentMethodRepository) => async (payload: PaymentMethodPayload) => {
    const findData = await repo.getDetail({
      type: "id",
      identifier: payload.id!,
    });
    if (!findData) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "metode pembayaran tidak ditemukan",
      });
    }
    return await repo.update(payload);
  };

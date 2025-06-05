import { type PaymentMethodPayload } from "@/model/payment-method.model";
import { TRPCError } from "@trpc/server";

import { type PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";

export const createPaymentMethodUseCase =
  (repo: PaymentMethodRepository) => async (payload: PaymentMethodPayload) => {
    const isExist = await repo.getDetail({
      type: "name_accountNumber",
      identifier: {
        name: payload.name,
        accountNumber: payload.accountNumber,
      },
    });

    if (isExist) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "metode pembayaran ini sudah dibuat sebelumnya.",
      });
    }
    return await repo.create(payload);
  };

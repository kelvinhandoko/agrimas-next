import { paymentMethodPayloadSchema } from "@/model/payment-method.model";
import { adminCompanyProcedure } from "@/trpc/trpc";

import { PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";
import { createPaymentMethodUseCase } from "@/server/paymentMethod/use-cases/create-payment-method.use-case";
import { TransactionService } from "@/server/services";

export const createPaymentMethodController = adminCompanyProcedure
  .input(paymentMethodPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const paymentMethodRepo = new PaymentMethodRepository(tx);
      return await createPaymentMethodUseCase(paymentMethodRepo)({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });

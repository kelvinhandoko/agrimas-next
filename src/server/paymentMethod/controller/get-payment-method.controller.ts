import { companyProcedure } from "@/trpc/trpc";

import { paginatedQuery } from "@/server/common";
import { PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";
import { getPaymentMethodUseCase } from "@/server/paymentMethod/use-cases/get-payment-method.use-case";

export const getPaymentMethodController = companyProcedure
  .input(paginatedQuery)
  .query(async ({ ctx, input }) => {
    const paymentMethodRepo = new PaymentMethodRepository(ctx.db);
    return await getPaymentMethodUseCase(paymentMethodRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

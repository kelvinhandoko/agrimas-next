import { companyProcedure } from "@/trpc/trpc";

import { cursorQuery } from "@/server/common";
import { PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";
import { getInfinitePaymentMethodUseCase } from "@/server/paymentMethod/use-cases/get-infinite-payment-method.use-case";

export const getInfinitePaymentMethodController = companyProcedure
  .input(cursorQuery)
  .query(async ({ ctx, input }) => {
    const paymentMethodRepo = new PaymentMethodRepository(ctx.db);
    return await getInfinitePaymentMethodUseCase(paymentMethodRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

import { paginatedSalesPaymentQuerySchema } from "@/model/sales-payment.model";
import { companyProcedure } from "@/trpc/trpc";

import { SalesPaymentRepository } from "@/server/salesPayment/sales-payment.repository";
import { getSalesPaymentUseCase } from "@/server/salesPayment/use-cases/get-sales-payment.use-case";

export const getSalesPaymentController = companyProcedure
  .input(paginatedSalesPaymentQuerySchema)
  .query(async ({ ctx, input }) => {
    const salesPaymentRepo = new SalesPaymentRepository(ctx.db);
    return await getSalesPaymentUseCase(salesPaymentRepo)(input);
  });

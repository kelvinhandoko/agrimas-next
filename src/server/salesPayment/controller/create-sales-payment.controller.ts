import { salesPaymentPayload } from "@/model/sales-payment.model";
import { companyProcedure } from "@/trpc/trpc";

import { SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";
import { SalesPaymentRepository } from "@/server/salesPayment/sales-payment.repository";
import { createSalesPaymentUseCase } from "@/server/salesPayment/use-cases/create-sales-payment.use-case";
import { TransactionService } from "@/server/services";

export const createSalesPaymentController = companyProcedure
  .input(salesPaymentPayload)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const salesRepo = new SalesInvoiceRepository(tx);
      const salesPaymentRepo = new SalesPaymentRepository(tx);
      return await createSalesPaymentUseCase({ salesPaymentRepo, salesRepo })({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });

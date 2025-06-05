import { purchasePaymentPayloadSchema } from "@/model/purchase-payment.model";
import { companyProcedure } from "@/trpc/trpc";

import { PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";
import { PurchasePaymentRepository } from "@/server/purchasePayment/purchase-payment.repository";
import { createPurchasePaymentUseCase } from "@/server/purchasePayment/use-case/create-purchase-payment.use-case";
import { TransactionService } from "@/server/services";

export const createPurchasePaymentController = companyProcedure
  .input(purchasePaymentPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (trx) => {
      const purchaseInvoiceRepo = new PurchaseInvoiceRepository(trx);
      const purchasePaymentRepo = new PurchasePaymentRepository(trx);

      const createPurchasePayment = await createPurchasePaymentUseCase(
        purchasePaymentRepo,
        purchaseInvoiceRepo,
      )({ ...input, companyId: ctx.session.user.companyId });

      return createPurchasePayment;
    });
  });

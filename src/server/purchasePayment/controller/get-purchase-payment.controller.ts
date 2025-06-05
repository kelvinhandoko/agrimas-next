import { paginatedPurchasePaymentQuerySchema } from "@/model/purchase-payment.model";
import { companyProcedure } from "@/trpc/trpc";

import { PurchasePaymentRepository } from "@/server/purchasePayment/purchase-payment.repository";
import { getPurchasePaymentUseCase } from "@/server/purchasePayment/use-case/get-purchase-payment.use-case";

export const getPurchasePaymentController = companyProcedure
  .input(paginatedPurchasePaymentQuerySchema)
  .query(async ({ ctx, input }) => {
    const purchasePaymentRepo = new PurchasePaymentRepository(ctx.db);
    return await getPurchasePaymentUseCase(purchasePaymentRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

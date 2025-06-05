import { cursoredPurchasePaymentQuerySchema } from "@/model/purchase-payment.model";
import { companyProcedure } from "@/trpc/trpc";

import { PurchasePaymentRepository } from "@/server/purchasePayment/purchase-payment.repository";
import { getInfinitePurchasePaymentUseCase } from "@/server/purchasePayment/use-case/get-infinite-purchase-payment.use-case";

export const getInfinitePurchasePaymentController = companyProcedure
  .input(cursoredPurchasePaymentQuerySchema)
  .query(async ({ ctx, input }) => {
    const purchasePaymentRepo = new PurchasePaymentRepository(ctx.db);
    return await getInfinitePurchasePaymentUseCase(purchasePaymentRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

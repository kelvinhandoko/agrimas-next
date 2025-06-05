import { cursorPurchaseQuerySchema } from "@/model/purchase.model";
import { companyProcedure } from "@/trpc/trpc";

import { PurchaseRepository } from "@/server/purchase/purchase.repository";
import { getInfinitePurchaseUseCase } from "@/server/purchase/use-cases/get-infinite-purchase.use-case";

export const getInfinitePurchaseController = companyProcedure
  .input(cursorPurchaseQuerySchema)
  .query(async ({ input, ctx }) => {
    const purchaseRepo = new PurchaseRepository(ctx.db);
    return await getInfinitePurchaseUseCase(purchaseRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

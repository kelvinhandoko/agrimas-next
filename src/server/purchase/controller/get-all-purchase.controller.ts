import { paginatedPurchaseQuerySchema } from "@/model/purchase.model";
import { companyProcedure } from "@/trpc/trpc";

import { PurchaseRepository } from "@/server/purchase/purchase.repository";
import { getAllPurchaseUseCase } from "@/server/purchase/use-cases/get-all-purchase.use-case";

export const getAllPurchaseController = companyProcedure
  .input(paginatedPurchaseQuerySchema)
  .query(async ({ input, ctx }) => {
    const purchaseRepo = new PurchaseRepository(ctx.db);
    return await getAllPurchaseUseCase(purchaseRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

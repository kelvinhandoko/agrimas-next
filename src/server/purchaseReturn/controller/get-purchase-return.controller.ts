import { paginatedPurchaseReturnSchema } from "@/model/purchase-return.model";
import { companyProcedure } from "@/trpc/trpc";

import { PurchaseReturnRepository } from "@/server/purchaseReturn/purchase-return.repository";
import { getPurchaseReturnUseCase } from "@/server/purchaseReturn/use-cases/get-purchase-return.use-case";

export const getPurchaseReturnController = companyProcedure
  .input(paginatedPurchaseReturnSchema)
  .query(async ({ input, ctx }) => {
    const purchaseReturnRepo = new PurchaseReturnRepository(ctx.db);
    return await getPurchaseReturnUseCase(purchaseReturnRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

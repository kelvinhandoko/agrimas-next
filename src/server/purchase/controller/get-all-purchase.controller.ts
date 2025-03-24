import { GetAllPurchaseQuerySchema } from "@/model/purchase.model";
import { companyProcedure } from "@/trpc/trpc";

import { PurchaseRepository } from "@/server/purchase/purchase.repository";
import { getAllPurchaseUseCase } from "@/server/purchase/use-cases/get-all-purchase.use-case";

export const getAllPurchaseController = companyProcedure
  .input(GetAllPurchaseQuerySchema)
  .query(async ({ input, ctx }) => {
    const purchaseRepo = new PurchaseRepository(ctx.db);
    return await getAllPurchaseUseCase(purchaseRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
      include: {
        supplier: {
          select: {
            nama: true,
          },
        },
        purchaseDetail: {
          select: {
            quantity: true,
          },
        },
      },
    });
  });

import { companyProcedure } from "@/trpc/trpc";
import { z } from "zod";

import { PurchaseRepository } from "@/server/purchase/purchase.repository";
import { getDetailPurchaseUseCase } from "@/server/purchase/use-cases/get-detail-purchase.use-case";

export const getDetailPurchaseController = companyProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const purchaseRepo = new PurchaseRepository(ctx.db);
    const purchase = await getDetailPurchaseUseCase(purchaseRepo)(input);
    return purchase;
  });

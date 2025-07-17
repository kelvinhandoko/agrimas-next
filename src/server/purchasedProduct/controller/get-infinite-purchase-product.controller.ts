import { cursoredPurchasedProductQuerySchema } from "@/model/purchased-product.model";
import { companyProcedure } from "@/trpc/trpc";

import { PurchasedProductRepository } from "@/server/purchasedProduct/purchased-product.repository";
import { getInfinitePurchasedProductUseCase } from "@/server/purchasedProduct/useCases/get-infinite-purchase-product.use-case";

export const getInfinitePurchasedProductController = companyProcedure
  .input(cursoredPurchasedProductQuerySchema)
  .query(async ({ ctx, input }) => {
    const purchasedProductRepo = new PurchasedProductRepository(ctx.db);
    return await getInfinitePurchasedProductUseCase(purchasedProductRepo)(
      input,
    );
  });

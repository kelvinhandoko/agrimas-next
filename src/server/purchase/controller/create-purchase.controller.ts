import { purchasePayloadSchema } from "@/model/purchase.model";
import { companyProcedure } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";

import { ProductRepository } from "@/server/product/product.repository";
import { getDetailProductUseCase } from "@/server/product/use-cases/get-detail-product.use-case";
import { PurchaseRepository } from "@/server/purchase/purchase.repository";
import { createPurchaseUseCase } from "@/server/purchase/use-cases/create-purchase.use-case";
import { PurchaseDetailRepository } from "@/server/purchaseDetail/purchase-detail.repository";
import { createPurchaseDetailUseCase } from "@/server/purchaseDetail/use-case/create-purchase-detail.repository";
import { TransactionService } from "@/server/services";

export const createPurchaseController = companyProcedure
  .input(purchasePayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const purchaseRepo = new PurchaseRepository(tx);
      const purchaseDetailRepo = new PurchaseDetailRepository(tx);
      const productRepo = new ProductRepository(tx);

      // create purchase
      const createdPurchase = await createPurchaseUseCase(purchaseRepo)({
        ...input,
        companyId: ctx.session.user.companyId,
      });

      // create purchase detail
      await Promise.all(
        input.detail.map(async (detail) => {
          const product = await getDetailProductUseCase(productRepo)(
            detail.productId,
          );
          if (!product) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "product tidak ditemukan",
            });
          }
          await createPurchaseDetailUseCase(purchaseDetailRepo)({
            ...detail,
            purchaseId: createdPurchase.id,
            companyId: ctx.session.user.companyId,
          });
        }),
      );

      return createdPurchase;
    });
  });

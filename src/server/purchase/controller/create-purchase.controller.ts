import { purchasePayloadSchema } from "@/model/purchase.model";
import { companyProcedure } from "@/trpc/trpc";
import { paymentStatusHelper } from "@/utils/paymentStatusHelper";
import { TRPCError } from "@trpc/server";

import { ProductRepository } from "@/server/product/product.repository";
import { getDetailProductUseCase } from "@/server/product/use-cases/get-detail-product.use-case";
import { updateStockAndAveragePriceUseCase } from "@/server/product/use-cases/update-stock-and-average-price.use-case";
import { PurchaseRepository } from "@/server/purchase/purchase.repository";
import { createPurchaseUseCase } from "@/server/purchase/use-cases/create-purchase.use-case";
import { updatePurcahseStatusUseCase } from "@/server/purchase/use-cases/update-purchase-status.use-case";
import { PurchaseDetailRepository } from "@/server/purchaseDetail/purchase-detail.repository";
import { createPurchaseDetailUseCase } from "@/server/purchaseDetail/use-case/create-purchase-detail.repository";
import { PurchasePaymentRepository } from "@/server/purchasePayment/purchase-payment.repository";
import { createPurchasePaymentUseCase } from "@/server/purchasePayment/use-case/create-purchase-payment.use-case";
import { TransactionService } from "@/server/services";

export const createPurchaseController = companyProcedure
  .input(purchasePayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const purchasePaymentRepo = new PurchasePaymentRepository(tx);
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
          await updateStockAndAveragePriceUseCase(productRepo)({
            productId: detail.productId,
            currentQuantity: product.currentQuantity + detail.quantity,
            currentPrice: detail.price,
            prevAveragePrice: product.averagePrice,
            prevPrice: product.averagePrice,
            prevQuantity: product.currentQuantity,
          });
        }),
      );

      // create purchase payment if payment is not null
      if (input.payment) {
        await createPurchasePaymentUseCase(purchasePaymentRepo)({
          ...input.payment,
          purchaseId: createdPurchase.id,
          companyId: ctx.session.user.companyId,
        });
        await updatePurcahseStatusUseCase(purchaseRepo)({
          id: createdPurchase.id,
          paymentStatus: paymentStatusHelper(
            createdPurchase.netTotal,
            input.payment.amount,
          ),
        });
      }
    });
  });

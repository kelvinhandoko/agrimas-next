import { recieveItemPayloadSchema } from "@/model/recieve-item.model";
import { companyProcedure } from "@/trpc/trpc";

import { ProductRepository } from "@/server/product/product.repository";
import { PurchaseRepository } from "@/server/purchase/purchase.repository";
import { PurchaseDetailRepository } from "@/server/purchaseDetail/purchase-detail.repository";
import { handlePurchaseProductOrchestrator } from "@/server/purchasedProduct/orchestrator/handle-purchased-product.orchestrator";
import { PurchasedProductRepository } from "@/server/purchasedProduct/purchased-product.repository";
import { createPurchasedProductUseCase } from "@/server/purchasedProduct/useCases/create-purchase-product.use-case";
import { findPurchasedProductUseCase } from "@/server/purchasedProduct/useCases/find-purchase-product.use-case";
import { UpdatePurchasedProductUseCase } from "@/server/purchasedProduct/useCases/update-purchase-product.use-case";
import { ReceiveItemRepository } from "@/server/recieveItem/receive-item.repository";
import { createReceiveItemUseCase } from "@/server/recieveItem/use-cases/create-receive-item.use-case";
import { ReceiveItemDetailRepository } from "@/server/recieveItemDetail/receive-detail.repository";
import { createReceiveItemDetailUseCase } from "@/server/recieveItemDetail/use-cases/create-receive-detail.use-cases";
import { TransactionService } from "@/server/services";

export const createReceiveItemController = companyProcedure
  .input(recieveItemPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const { purchaseId, receiveDate, note, details, ref, discount, tax } =
      input;
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (trx) => {
      const purchaseRepo = new PurchaseRepository(trx);
      const purchaseDetailRepo = new PurchaseDetailRepository(trx);
      const receiveDetailRepo = new ReceiveItemDetailRepository(trx);
      const receiveItemRepo = new ReceiveItemRepository(trx);
      const productRepo = new ProductRepository(trx);
      const purchasedProductRepo = new PurchasedProductRepository(trx);

      const createdReceiveItem = await createReceiveItemUseCase({
        purchaseRepo,
        receiveRepo: receiveItemRepo,
      })({
        companyId: ctx.session.user.companyId,
        purchaseId,
        receiveDate,
        note,
        details,
        ref,
        discount,
        tax,
      });

      const createPurchaseProduct =
        createPurchasedProductUseCase(purchasedProductRepo);
      const updatePurchaseProduct =
        UpdatePurchasedProductUseCase(purchasedProductRepo);
      const findPurchaseProduct =
        findPurchasedProductUseCase(purchasedProductRepo);

      await Promise.all(
        details.map(async (detail) => {
          await handlePurchaseProductOrchestrator({
            createPurchaseProduct,
            findPurchaseProduct,
            updatePurchaseProduct,
          })({
            productId: detail.productId,
            quantity: detail.quantity,
            supplierId: createdReceiveItem.purchase.supplierId,
          });

          await createReceiveItemDetailUseCase({
            receiveItemDetail: receiveDetailRepo,
            productRepo,
            purchaseDetailRepository: purchaseDetailRepo,
          })({
            ...detail,
            receiveItemId: createdReceiveItem.id,
            purchaseId,
          });
        }),
      );
    });
  });

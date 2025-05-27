import { recieveItemPayloadSchema } from "@/model/recieve-item.model";
import { companyProcedure } from "@/trpc/trpc";

import { ProductRepository } from "@/server/product/product.repository";
import { PurchaseRepository } from "@/server/purchase/purchase.repository";
import { PurchaseDetailRepository } from "@/server/purchaseDetail/purchase-detail.repository";
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

      await Promise.all(
        details.map(async (detail) => {
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

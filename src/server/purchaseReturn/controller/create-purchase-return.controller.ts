import { purchaseReturnPayloadSchema } from "@/model/purchase-return.model";
import { companyProcedure } from "@/trpc/trpc";

import { db } from "@/server/db";
import { getTotalPurchaseProductOrchestrator } from "@/server/product/orchestrator/get-total-purchase-product.orchestrator";
import { ProductRepository } from "@/server/product/product.repository";
import { getDetailProductUseCase } from "@/server/product/use-cases/get-detail-product.use-case";
import { createPurchaseReturnOrchestrator } from "@/server/purchaseReturn/orchestrator/create-purchase-return.orchestrator";
import { PurchaseReturnRepository } from "@/server/purchaseReturn/purchase-return.repository";
import { createPurchaseReturnUseCase } from "@/server/purchaseReturn/use-cases/create-purchase-return.use-case";
import { createPurchaseReturnDetailOrchestrator } from "@/server/purchaseReturnDetail/orchestrator/create-purchase-return-detail.orchestrator";
import { PurchaseReturnDetailRepository } from "@/server/purchaseReturnDetail/purchase-return-detail.repository";
import { createPurchaseReturnDetailUseCase } from "@/server/purchaseReturnDetail/use-cases/create-purchase-return-detail.use-case";
import { getPurchaseReturnTotalUseCase } from "@/server/purchaseReturnDetail/use-cases/get-purchase-return-total.use-case";
import { ReceiveItemRepository } from "@/server/recieveItem/receive-item.repository";
import { getTotalReceiveItemUseCase } from "@/server/recieveItem/use-cases/get-total-receive.use-case";
import { TransactionService } from "@/server/services";
import {
  SupplierRepository,
  getDetailByIdSupplierUseCase,
} from "@/server/supplier";

export const createPurchaseReturnController = companyProcedure
  .input(purchaseReturnPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(db);
    return await transactionService.startTransaction(async (tx) => {
      const purchaseReturnRepo = new PurchaseReturnRepository(tx);
      const purchaseReturnDetailRepo = new PurchaseReturnDetailRepository(tx);
      const receiveItemRepo = new ReceiveItemRepository(tx);
      const supplierRepo = new SupplierRepository(tx);
      const productRepo = new ProductRepository(tx);

      const createPurchaseReturn =
        createPurchaseReturnUseCase(purchaseReturnRepo);
      const findSupplier = getDetailByIdSupplierUseCase(supplierRepo);
      const getTotalReceiveItem = getTotalReceiveItemUseCase(receiveItemRepo);
      const getTotalReturn = getPurchaseReturnTotalUseCase(
        purchaseReturnDetailRepo,
      );
      const createPurchaseReturnDetail = createPurchaseReturnDetailUseCase(
        purchaseReturnDetailRepo,
      );

      const getProduct = getDetailProductUseCase(productRepo);

      const purchaseReturn = await createPurchaseReturnOrchestrator({
        createPurchaseReturn,
        findSupplier,
      })({ ...input, companyId: ctx.session.user.companyId });

      await Promise.all(
        input.detail.map(async (detail) => {
          const getPurchaseQuantity = getTotalPurchaseProductOrchestrator(
            getTotalReceiveItem,
            getTotalReturn,
          );
          await createPurchaseReturnDetailOrchestrator({
            createPurchaseReturnDetail,
            getProduct,
            getPurchaseQuantity,
          })({
            ...detail,
            purchaseReturnId: purchaseReturn.id,
            supplierId: purchaseReturn.supplierId,
          });
        }),
      );
      return purchaseReturn;
    });
  });

import { purchaseReturnPayloadSchema } from "@/model/purchase-return.model";
import { companyProcedure } from "@/trpc/trpc";

import { db } from "@/server/db";
import { ProductRepository } from "@/server/product/product.repository";
import { getDetailProductUseCase } from "@/server/product/use-cases/get-detail-product.use-case";
import { createPurchaseReturnOrchestrator } from "@/server/purchaseReturn/orchestrator/create-purchase-return.orchestrator";
import { PurchaseReturnRepository } from "@/server/purchaseReturn/purchase-return.repository";
import { createPurchaseReturnUseCase } from "@/server/purchaseReturn/use-cases/create-purchase-return.use-case";
import { createPurchaseReturnDetailOrchestrator } from "@/server/purchaseReturnDetail/orchestrator/create-purchase-return-detail.orchestrator";
import { PurchaseReturnDetailRepository } from "@/server/purchaseReturnDetail/purchase-return-detail.repository";
import { createPurchaseReturnDetailUseCase } from "@/server/purchaseReturnDetail/use-cases/create-purchase-return-detail.use-case";
import { handlePurchaseProductOrchestrator } from "@/server/purchasedProduct/orchestrator/handle-purchased-product.orchestrator";
import { PurchasedProductRepository } from "@/server/purchasedProduct/purchased-product.repository";
import { createPurchasedProductUseCase } from "@/server/purchasedProduct/useCases/create-purchase-product.use-case";
import { findPurchasedProductUseCase } from "@/server/purchasedProduct/useCases/find-purchase-product.use-case";
import { UpdatePurchasedProductUseCase } from "@/server/purchasedProduct/useCases/update-purchase-product.use-case";
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

      const supplierRepo = new SupplierRepository(tx);
      const productRepo = new ProductRepository(tx);
      const purchasedProductRepo = new PurchasedProductRepository(tx);

      const createPurchaseReturn =
        createPurchaseReturnUseCase(purchaseReturnRepo);
      const findSupplier = getDetailByIdSupplierUseCase(supplierRepo);

      const createPurchaseReturnDetail = createPurchaseReturnDetailUseCase(
        purchaseReturnDetailRepo,
      );

      const getProduct = getDetailProductUseCase(productRepo);

      const purchaseReturn = await createPurchaseReturnOrchestrator({
        createPurchaseReturn,
        findSupplier,
      })({ ...input, companyId: ctx.session.user.companyId });

      const createPurchaseProduct =
        createPurchasedProductUseCase(purchasedProductRepo);
      const updatePurchaseProduct =
        UpdatePurchasedProductUseCase(purchasedProductRepo);
      const findPurchaseProduct =
        findPurchasedProductUseCase(purchasedProductRepo);

      const handlePurchaseProduct = handlePurchaseProductOrchestrator({
        createPurchaseProduct,
        findPurchaseProduct,
        updatePurchaseProduct,
      });

      await Promise.all(
        input.detail.map(async (detail) => {
          await createPurchaseReturnDetailOrchestrator({
            createPurchaseReturnDetail,
            getProduct,
            handlePurchaseProduct,
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

import { type PurchaseReturnPayload } from "@/model/purchase-return.model";
import { TRPCError } from "@trpc/server";

import { type GetDetailProductUseCase } from "@/server/product/use-cases/get-detail-product.use-case";
import { type CreatePurchaseReturnDetailUseCase } from "@/server/purchaseReturnDetail/use-cases/create-purchase-return-detail.use-case";
import { type IHandlePurchaseProductOrchestrator } from "@/server/purchasedProduct/orchestrator/handle-purchased-product.orchestrator";

export const createPurchaseReturnDetailOrchestrator =
  (useCases: {
    createPurchaseReturnDetail: CreatePurchaseReturnDetailUseCase;
    getProduct: GetDetailProductUseCase;
    handlePurchaseProduct: IHandlePurchaseProductOrchestrator;
  }) =>
  async (
    payload: Pick<PurchaseReturnPayload, "detail">["detail"][0] & {
      supplierId: string;
      purchaseReturnId: string;
    },
  ) => {
    const { createPurchaseReturnDetail, getProduct, handlePurchaseProduct } =
      useCases;
    const product = await getProduct(payload.productId);
    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "product tidak ditemukan",
      });
    }
    await handlePurchaseProduct({
      supplierId: payload.supplierId,
      productId: payload.productId,
      return: payload.quantity,
    });
    await createPurchaseReturnDetail(payload);
  };

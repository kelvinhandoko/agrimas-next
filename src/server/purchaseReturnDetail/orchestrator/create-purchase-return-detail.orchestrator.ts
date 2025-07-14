import { type PurchaseReturnPayload } from "@/model/purchase-return.model";
import { TRPCError } from "@trpc/server";

import { type IGetTotalPurchaseProductOrchestrator } from "@/server/product/orchestrator/get-total-purchase-product.orchestrator";
import { type GetDetailProductUseCase } from "@/server/product/use-cases/get-detail-product.use-case";
import { type CreatePurchaseReturnDetailUseCase } from "@/server/purchaseReturnDetail/use-cases/create-purchase-return-detail.use-case";

export const createPurchaseReturnDetailOrchestrator =
  (useCases: {
    createPurchaseReturnDetail: CreatePurchaseReturnDetailUseCase;
    getProduct: GetDetailProductUseCase;
    getPurchaseQuantity: IGetTotalPurchaseProductOrchestrator;
  }) =>
  async (
    payload: Pick<PurchaseReturnPayload, "detail">["detail"][0] & {
      supplierId: string;
      purchaseReturnId: string;
    },
  ) => {
    const { createPurchaseReturnDetail, getProduct, getPurchaseQuantity } =
      useCases;
    const product = await getProduct(payload.productId);
    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "product tidak ditemukan",
      });
    }

    const availableQuantityToReturn = await getPurchaseQuantity({
      productId: payload.productId,
      supplierId: payload.supplierId,
    });

    if (payload.quantity > availableQuantityToReturn) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `jumlah retur produk ${product.name} tidak mencukupi`,
      });
    }
    await createPurchaseReturnDetail(payload);
  };

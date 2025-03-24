import { type ReceiveItemDetailPayload } from "@/model/receive-item-detail.model";
import { TRPCError } from "@trpc/server";

import { type ProductRepository } from "@/server/product/product.repository";
import { type PurchaseDetailRepository } from "@/server/purchaseDetail/purchase-detail.repository";
import { type ReceiveItemDetailRepository } from "@/server/recieveItemDetail/receive-detail.repository";

export const createReceiveItemDetailUseCase =
  (repos: {
    receiveItemDetail: ReceiveItemDetailRepository;
    productRepo: ProductRepository;
    purchaseDetailRepository: PurchaseDetailRepository;
  }) =>
  async (payload: ReceiveItemDetailPayload) => {
    const { productId, quantity, purchaseId } = payload;

    const findProduct = await repos.productRepo.findDetail(payload.productId);
    if (!findProduct) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `produk tidak ditemukan`,
      });
    }

    const findPurchaseDetail =
      await repos.purchaseDetailRepository.findPurchaseProduct({
        productId,
        purchaseId,
      });
    if (!findPurchaseDetail) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `detail pembelian tidak ditemukan`,
      });
    }

    const newPurchaseReceive = findPurchaseDetail.totalReceive + quantity;
    if (newPurchaseReceive > findPurchaseDetail.quantity) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `jumlah penerimaan tidak boleh lebih dari jumlah pembelian`,
      });
    }

    await repos.purchaseDetailRepository.updateTotalReceive({
      purchaseDetailId: findPurchaseDetail.id,
      totalReceive: newPurchaseReceive,
    });

    const newQuantity = findPurchaseDetail.quantity + quantity;
    await repos.productRepo.updateStockAndAverage({
      productId,
      currentPrice: findPurchaseDetail.netTotal,
      prevAveragePrice: findProduct.averagePrice,
      prevQuantity: findPurchaseDetail.quantity,
      currentQuantity: newQuantity,
      prevPrice: findPurchaseDetail.netTotal,
    });

    await repos.receiveItemDetail.create(payload);
  };

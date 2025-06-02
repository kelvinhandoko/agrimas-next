import { type PurchaseRepository } from "@/server/purchase/purchase.repository";

export const getDetailPurchaseUseCase =
  (purchaseRepo: PurchaseRepository) => async (id: string) => {
    return await purchaseRepo.getDetail(id);
  };

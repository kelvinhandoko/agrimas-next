import { type PurchasePayload } from "@/model/purchase.model";
import { TRPCError } from "@trpc/server";

import { type PurchaseRepository } from "@/server/purchase/purchase.repository";

export const createPurchaseUseCase =
  (purchaseRepo: PurchaseRepository) => async (payload: PurchasePayload) => {
    if (payload.ref) {
      const purchase = await purchaseRepo.findUniqueRef(payload.ref);
      if (purchase) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "pembelian ini sudah pernah dibuat",
        });
      }
    }
    return await purchaseRepo.create(payload);
  };

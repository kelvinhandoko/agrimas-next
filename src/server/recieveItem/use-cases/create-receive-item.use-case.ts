import { type ReceiveItemPayload } from "@/model/recieve-item.model";
import { TRPCError } from "@trpc/server";

import { type PurchaseRepository } from "@/server/purchase/purchase.repository";
import { type ReceiveItemRepository } from "@/server/recieveItem/receive-item.repository";

export const createReceiveItemUseCase =
  (repos: {
    receiveRepo: ReceiveItemRepository;
    purchaseRepo: PurchaseRepository;
  }) =>
  async (payload: ReceiveItemPayload) => {
    const { purchaseId } = payload;
    const purchase = await repos.purchaseRepo.getDetail(purchaseId);
    if (!purchase)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Purchase not found",
      });
    return await repos.receiveRepo.create(payload);
  };

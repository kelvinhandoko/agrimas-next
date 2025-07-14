import { type GetTotalPurchaseReturnPayload } from "@/model/purchase-return-detail.model";

import { type GetPurchaseReturnTotalUseCase } from "@/server/purchaseReturnDetail/use-cases/get-purchase-return-total.use-case";
import { type IGetTotalReceiveItemUseCase } from "@/server/recieveItem/use-cases/get-total-receive.use-case";

export const getTotalPurchaseProductOrchestrator =
  (
    getTotalPurchase: IGetTotalReceiveItemUseCase,
    getTotalReturn: GetPurchaseReturnTotalUseCase,
  ) =>
  async (payload: GetTotalPurchaseReturnPayload) => {
    const [totalPurchase, totalReturn] = await Promise.all([
      getTotalPurchase(payload),
      getTotalReturn(payload),
    ]);
    return totalPurchase - totalReturn;
  };

export type IGetTotalPurchaseProductOrchestrator = ReturnType<
  Awaited<typeof getTotalPurchaseProductOrchestrator>
>;

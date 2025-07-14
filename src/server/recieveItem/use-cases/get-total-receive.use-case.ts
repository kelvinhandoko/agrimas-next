import { type GetReceiveItemBySupplierPayload } from "@/model/recieve-item.model";

import { type ReceiveItemRepository } from "@/server/recieveItem/receive-item.repository";

export const getTotalReceiveItemUseCase =
  (repo: ReceiveItemRepository) =>
  async (payload: GetReceiveItemBySupplierPayload) =>
    await repo.getReceiveItemBySupplier(payload);

export type IGetTotalReceiveItemUseCase = ReturnType<
  Awaited<typeof getTotalReceiveItemUseCase>
>;

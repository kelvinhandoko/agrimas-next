import { type PurchaseReturnPayload } from "@/model/purchase-return.model";

import { type PurchaseReturnRepository } from "@/server/purchaseReturn/purchase-return.repository";

export const createPurchaseReturnUseCase =
  (model: PurchaseReturnRepository) => async (payload: PurchaseReturnPayload) =>
    await model.create(payload);

export type CreatePurchaseReturnUseCase = ReturnType<
  Awaited<typeof createPurchaseReturnUseCase>
>;

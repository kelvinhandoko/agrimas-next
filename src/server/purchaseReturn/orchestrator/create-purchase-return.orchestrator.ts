import { type PurchaseReturnPayload } from "@/model/purchase-return.model";

import { type CreatePurchaseReturnUseCase } from "@/server/purchaseReturn/use-cases/create-purchase-return.use-case";
import { type GetDetailSupplierUseCase } from "@/server/supplier";

export const createPurchaseReturnOrchestrator =
  (useCases: {
    createPurchaseReturn: CreatePurchaseReturnUseCase;
    findSupplier: GetDetailSupplierUseCase;
  }) =>
  async (payload: PurchaseReturnPayload) => {
    const { createPurchaseReturn, findSupplier } = useCases;

    await findSupplier({ id: payload.supplierId });

    const createdPurchaseReturn = await createPurchaseReturn(payload);
    return createdPurchaseReturn;
  };

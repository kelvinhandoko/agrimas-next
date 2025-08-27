import { JournalPayload } from "@/model";
import { type PurchaseReturnPayload } from "@/model/purchase-return.model";

import { type IGetDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { type ICreateJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { type CreatePurchaseReturnUseCase } from "@/server/purchaseReturn/use-cases/create-purchase-return.use-case";
import { type ICreatePurchaseReturnOrchestrator } from "@/server/purchaseReturnDetail/orchestrator/create-purchase-return-detail.orchestrator";
import { type GetDetailSupplierUseCase } from "@/server/supplier";

export const createPurchaseReturnOrchestrator =
  (useCases: {
    createPurchaseReturn: CreatePurchaseReturnUseCase;
    findSupplier: GetDetailSupplierUseCase;
    createPurchaseReturnDetail: ICreatePurchaseReturnOrchestrator;
    getDefaultAccount: IGetDefaultAccountUseCase;
    createJournal: ICreateJournalOrchestrator;
  }) =>
  async (payload: PurchaseReturnPayload) => {
    const {
      createPurchaseReturn,
      findSupplier,
      createPurchaseReturnDetail,
      createJournal,
      getDefaultAccount,
    } = useCases;

    await findSupplier({ id: payload.supplierId });

    const createdPurchaseReturn = await createPurchaseReturn(payload);

    await Promise.all(
      payload.detail.map(async (detail) => {
        await createPurchaseReturnDetail({
          ...detail,
          purchaseReturnId: createdPurchaseReturn.id,
          supplierId: createdPurchaseReturn.supplierId,
        });
      }),
    );

    const defaultAccount = await getDefaultAccount(payload.companyId);
    const journalDetailPayload = [] as JournalPayload["details"];

    return createdPurchaseReturn;
  };

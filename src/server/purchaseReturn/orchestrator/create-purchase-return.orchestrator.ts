import { type JournalPayload } from "@/model";
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

    const { totalDebt } = await findSupplier({ id: payload.supplierId });
    const total = payload.detail.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0,
    );
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

    const debtAccount = defaultAccount.get("HUTANG_USAHA")!;
    const supplierDepositAccount = defaultAccount.get("DEPOSIT_SUPPLIER")!;
    const inventoryAccount = defaultAccount.get("PERSEDIAAN")!;

    // Jurnal untuk mengurangi persediaan (selalu ada)
    journalDetailPayload.push({
      accountId: inventoryAccount,
      debit: 0,
      credit: total,
    });

    if (total <= totalDebt) {
      journalDetailPayload.push({
        accountId: debtAccount,
        debit: total,
        credit: 0,
      });
    } else {
      if (totalDebt > 0) {
        journalDetailPayload.push({
          accountId: debtAccount,
          debit: totalDebt,
          credit: 0,
        });
      }

      const depositAmount = total - totalDebt;
      journalDetailPayload.push({
        accountId: supplierDepositAccount,
        debit: depositAmount,
        credit: 0,
      });
    }

    await createJournal({
      companyId: payload.companyId,
      date: payload.date,
      description: `retur pembelian ${createdPurchaseReturn.ref}`,
      type: "GENERAL",
      details: journalDetailPayload,
    });

    return createdPurchaseReturn;
  };

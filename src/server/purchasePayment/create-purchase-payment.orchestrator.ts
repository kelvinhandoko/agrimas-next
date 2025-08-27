import { type JournalPayload } from "@/model";
import { type PurchasePaymentPayload } from "@/model/purchase-payment.model";

import { type IGetDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { type ICreateJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { type IGetDetailPaymentMethodUseCase } from "@/server/paymentMethod/use-cases/get-detail-payment-method.use-case";
import { type IUpdatePaymentMethodUseCase } from "@/server/paymentMethod/use-cases/update-payment-method.use-case";
import { type ICreatePurchasePaymentUseCase } from "@/server/purchasePayment/use-case/create-purchase-payment.use-case";

export const createPurchasePaymentOrchestrator =
  (usecases: {
    findPaymentMethod: IGetDetailPaymentMethodUseCase;
    createPurchasePayment: ICreatePurchasePaymentUseCase;
    getDefaultAccount: IGetDefaultAccountUseCase;
    createJournal: ICreateJournalOrchestrator;
    updatePaymentMethod: IUpdatePaymentMethodUseCase;
  }) =>
  async (payload: PurchasePaymentPayload) => {
    const {
      createJournal,
      createPurchasePayment,
      findPaymentMethod,
      getDefaultAccount,
      updatePaymentMethod,
    } = usecases;
    const paymentMethod = await findPaymentMethod({
      type: "id",
      identifier: payload.paymentMethodId,
    });
    const defaultAccount = await getDefaultAccount(payload.companyId);
    const payment = await createPurchasePayment({ ...payload });
    const journalDetailPayload = [] as JournalPayload["details"];
    journalDetailPayload.push(
      {
        accountId: defaultAccount.get("HUTANG_USAHA")!,
        credit: 0,
        debit: payment.amount,
      },
      {
        accountId: paymentMethod.accountId!,
        credit: payment.amount,
        debit: 0,
      },
    );
    await updatePaymentMethod({
      id: paymentMethod.id,
      amount: -payment.amount,
    });
    await createJournal({
      companyId: payload.companyId,
      date: payment.createdAt,
      description: `pembayaran pembelian ${payment.purchaseRef}`,
      type: "GENERAL",
      details: journalDetailPayload,
    });
  };

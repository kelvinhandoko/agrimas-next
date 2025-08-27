import { type JournalPayload } from "@/model";
import { type SalesPaymentPayload } from "@/model/sales-payment.model";

import { type IGetDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { type ICreateJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { type IGetDetailPaymentMethodUseCase } from "@/server/paymentMethod/use-cases/get-detail-payment-method.use-case";
import { type ICreateSalesPaymentUseCase } from "@/server/salesPayment/use-cases/create-sales-payment.use-case";

export const createSalesPaymentOrchestrator =
  (usecases: {
    findPaymentMethod: IGetDetailPaymentMethodUseCase;
    createSalesPayment: ICreateSalesPaymentUseCase;
    getDefaultAccount: IGetDefaultAccountUseCase;
    createJournal: ICreateJournalOrchestrator;
  }) =>
  async (payload: SalesPaymentPayload) => {
    const {
      createSalesPayment,
      getDefaultAccount,
      createJournal,
      findPaymentMethod,
    } = usecases;
    const paymentMethod = await findPaymentMethod({
      type: "id",
      identifier: payload.paymentMethodId,
    });
    const defaultAccount = await getDefaultAccount(payload.companyId);
    const payment = await createSalesPayment({ ...payload });
    const journalDetailPayload = [] as JournalPayload["details"];
    journalDetailPayload.push(
      {
        accountId: defaultAccount.get("PIUTANG_USAHA")!,
        credit: payment.amount,
        debit: 0,
      },
      {
        accountId: paymentMethod.accountId!,
        credit: 0,
        debit: payment.amount,
      },
    );

    await createJournal({
      companyId: payload.companyId,
      date: payload.date,
      description: `pembayaran penjualan ${payment.ref}`,
      type: "GENERAL",
      details: journalDetailPayload,
    });
  };

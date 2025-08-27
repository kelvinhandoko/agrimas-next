import { type PaymentMethodPayload } from "@/model/payment-method.model";
import { TRPCError } from "@trpc/server";

import { type ICreateAccountUseCase } from "@/server/account/use-cases/create-account.use-case";
import { type IGetDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { type IGetGroupAccountUseCase } from "@/server/groupAccount/use-cases/get-group-account.use-case";
import { type ICreateJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { type ICreatePaymentMethodUseCase } from "@/server/paymentMethod/use-cases/create-payment-method.use-case";

export const createPaymentMethodOrchestator =
  (usecases: {
    createPayment: ICreatePaymentMethodUseCase;
    getGroupAccount: IGetGroupAccountUseCase;
    createAccount: ICreateAccountUseCase;
    getDefaultAccount: IGetDefaultAccountUseCase;
    createJournal: ICreateJournalOrchestrator;
  }) =>
  async (payload: PaymentMethodPayload) => {
    const {
      createAccount,
      createPayment,
      getGroupAccount,
      createJournal,
      getDefaultAccount,
    } = usecases;
    const data = await createPayment(payload);

    const findGroup = await getGroupAccount({
      page: 1,
      limit: 1,
      accountClass: "ASSET",
      companyId: payload.companyId,
    });

    if (!findGroup.data.length && !findGroup.data[0]?.id) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Group account not found",
      });
    }

    const account = await createAccount({
      companyId: payload.companyId,
      groupAccountId: findGroup.data[0]!.id,
      name: payload.name,
      posisi: "DEBIT",
      reports: ["NERACA"],
    });
    if (payload.initialAmount > 0) {
      const defaultAccount = await getDefaultAccount(payload.companyId);
      console.log(defaultAccount);
      await createJournal({
        companyId: payload.companyId,
        date: new Date(),
        type: "GENERAL",
        description: `saldo awal untuk ${payload.name} ${payload.accountNumber ? payload.accountNumber : ""}`,
        details: [
          { accountId: account.id, debit: payload.initialAmount, credit: 0 },
          {
            accountId: defaultAccount.get("EKUITAS")!,
            debit: 0,
            credit: payload.initialAmount,
          },
        ],
      });
    }
    return data;
  };

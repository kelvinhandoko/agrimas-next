import { paymentMethodPayloadSchema } from "@/model/payment-method.model";
import { adminCompanyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account";
import { createAccountUseCase } from "@/server/account/use-cases/create-account.use-case";
import { DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";
import { getDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { GeneralLedgerRepository } from "@/server/generalLedger/repository/general-ledger.repository";
import { createGeneralLedgerUseCase } from "@/server/generalLedger/use-cases/create-general-ledger.use-case";
import { GroupAccountRepository } from "@/server/groupAccount/group-account.repository";
import { getGroupAccountUseCase } from "@/server/groupAccount/use-cases/get-group-account.use-case";
import { JournalRepository } from "@/server/journal/journal.repository";
import { createJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { createJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";
import { createJournalDetailUseCase } from "@/server/journalDetail/use-cases/create-journal-detail.use-case";
import { createPaymentMethodOrchestator } from "@/server/paymentMethod/orchestator/create-payment-method.orchestator";
import { PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";
import { createPaymentMethodUseCase } from "@/server/paymentMethod/use-cases/create-payment-method.use-case";
import { TransactionService } from "@/server/services";

export const createPaymentMethodController = adminCompanyProcedure
  .input(paymentMethodPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const paymentMethodRepo = new PaymentMethodRepository(tx);
      const accountRepo = new AccountRepository(tx);
      const groupAccountRepo = new GroupAccountRepository(tx);
      const defaultAccountRepo = new DefaultAccountRepository(tx);
      const journalRepo = new JournalRepository(tx);
      const journalDetailRepo = new JournalDetailRepository(tx);
      const generalLedgerRepo = new GeneralLedgerRepository(tx);

      return await createPaymentMethodOrchestator({
        createAccount: createAccountUseCase(accountRepo),
        createPayment: createPaymentMethodUseCase(paymentMethodRepo),
        getGroupAccount: getGroupAccountUseCase(groupAccountRepo),
        getDefaultAccount: getDefaultAccountUseCase(defaultAccountRepo),
        createJournal: createJournalOrchestrator({
          createGeneralLedgerUseCase:
            createGeneralLedgerUseCase(generalLedgerRepo),
          createJournalDetailUseCase: createJournalDetailUseCase({
            journalDetailRepo,
            accountRepo,
          }),
          createJournalUseCase: createJournalUseCase(journalRepo),
        }),
      })({ ...input, companyId: ctx.session.user.companyId });
    });
  });

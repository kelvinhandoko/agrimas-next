import { journalPayloadSchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account";
import { getDetailAccountUseCase } from "@/server/account/use-cases/get-detail-account.use-case";
import { db } from "@/server/db/prisma";
import { GeneralLedgerRepository } from "@/server/generalLedger/repository/general-ledger.repository";
import { createGeneralLedgerUseCase } from "@/server/generalLedger/use-cases/create-general-ledger.use-case";
import { JournalRepository } from "@/server/journal/journal.repository";
import { createJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { createJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";
import { createJournalDetailUseCase } from "@/server/journalDetail/use-cases/create-journal-detail.use-case";
import { PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";
import { updatePaymentMethodUseCase } from "@/server/paymentMethod/use-cases/update-payment-method.use-case";
import { TransactionService } from "@/server/services";

export const createJournalController = companyProcedure
  .input(journalPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(db);
    return transactionService.startTransaction(async (tx) => {
      const journalRepo = new JournalRepository(tx);
      const journalDetailRepo = new JournalDetailRepository(tx);
      const accountRepo = new AccountRepository(tx);
      const generalLedgerRepo = new GeneralLedgerRepository(tx);
      const paymentMethodRepo = new PaymentMethodRepository(tx);
      const createJournal = createJournalUseCase(journalRepo);
      const createJournalDetail = createJournalDetailUseCase({
        journalDetailRepo,
        accountRepo,
      });

      await Promise.all(
        input.details.map(async (d) => {
          const account = await getDetailAccountUseCase(accountRepo)({
            id: d.accountId,
          });
          if (account.PaymentMethod) {
            await updatePaymentMethodUseCase(paymentMethodRepo)({
              id: account.PaymentMethod.id,
              amount: d.debit - d.credit,
            });
          }
        }),
      );

      return await createJournalOrchestrator({
        createGeneralLedgerUseCase:
          createGeneralLedgerUseCase(generalLedgerRepo),
        createJournalDetailUseCase: createJournalDetail,
        createJournalUseCase: createJournal,
      })({ ...input, companyId: ctx.session.user.companyId });
    });
  });

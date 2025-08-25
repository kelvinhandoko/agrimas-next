import { journalPayloadSchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account";
import { db } from "@/server/db/prisma";
import { GeneralLedgerRepository } from "@/server/generalLedger/repository/general-ledger.repository";
import { createGeneralLedgerUseCase } from "@/server/generalLedger/use-cases/create-general-ledger.use-case";
import { JournalRepository } from "@/server/journal/journal.repository";
import { createJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { createJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";
import { createJournalDetailUseCase } from "@/server/journalDetail/use-cases/create-journal-detail.use-case";
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

      const createJournal = createJournalUseCase(journalRepo);
      const createJournalDetail = createJournalDetailUseCase({
        journalDetailRepo,
        accountRepo,
      });

      return await createJournalOrchestrator({
        createGeneralLedgerUseCase:
          createGeneralLedgerUseCase(generalLedgerRepo),
        createJournalDetailUseCase: createJournalDetail,
        createJournalUseCase: createJournal,
      })({ ...input, companyId: ctx.session.user.companyId });
    });
  });

import { journalPayloadSchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account";
import { db } from "@/server/db/prisma";
import { JournalRepository } from "@/server/journal/journal.repository";
import { createJournalUseCase } from "@/server/journal/use-cases";
import { JournalDetailRepository } from "@/server/journalDetail";
import { TransactionService } from "@/server/services";

export const createJournalController = companyProcedure
  .input(journalPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(db);
    return transactionService.startTransaction(async (tx) => {
      const journalRepo = new JournalRepository(tx);
      const journalDetailRepo = new JournalDetailRepository(tx);
      const accountRepo = new AccountRepository(tx);
      const createJournal = createJournalUseCase(
        journalRepo,
        journalDetailRepo,
        accountRepo,
      );
      return await createJournal({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });

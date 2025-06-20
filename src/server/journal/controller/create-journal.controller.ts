import { journalPayloadSchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";

import { AccountRepository } from "@/server/account";
import { db } from "@/server/db/prisma";
import { JournalRepository } from "@/server/journal/journal.repository";
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

      const creditTotal = input.details.reduce(
        (acc, curr) => acc + curr.credit,
        0,
      );
      const debitTotal = input.details.reduce(
        (acc, curr) => acc + curr.debit,
        0,
      );
      const checkBalance = creditTotal === debitTotal;
      if (!checkBalance) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "debit dan kredit tidak balance",
        });
      }

      const createJournal = createJournalUseCase(journalRepo);

      const createdJournal = await createJournal({
        ...input,
        companyId: ctx.session.user.companyId,
      });

      await Promise.all(
        input.details.map(async (detail) => {
          await createJournalDetailUseCase({ accountRepo, journalDetailRepo })({
            ...detail,
            journalId: createdJournal.id,
          });
        }),
      );

      return createdJournal;
    });
  });

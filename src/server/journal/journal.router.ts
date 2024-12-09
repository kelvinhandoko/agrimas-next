import { AccountRepository } from "@/server/account";
import { journalPayloadSchema } from "@/server/journal/journal.model";
import { JournalRepository } from "@/server/journal/journal.repository";
import { CreateJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail";
import { TransactionService } from "@/server/services";
import { companyProcedure, createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

export const journalRouter = createTRPCRouter({
  create: companyProcedure
    .input(journalPayloadSchema)
    .mutation(async ({ ctx, input }) => {
      const transactionService = new TransactionService(ctx.db);
      return transactionService.startTransaction(async (tx) => {
        const journalRepo = new JournalRepository(tx);
        const journalDetailRepo = new JournalDetailRepository(tx);
        const accountRepo = new AccountRepository(tx);
        const createJournalUseCase = new CreateJournalUseCase(
          journalRepo,
          journalDetailRepo,
          accountRepo,
        );
        return await createJournalUseCase.execute(input);
      });
    }),
});

export type JournalRouterOutputs = inferRouterOutputs<typeof journalRouter>;

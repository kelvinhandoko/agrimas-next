import {
  getAllJournalQuerySchema,
  journalPayloadSchema,
} from "@/model/journal.model";
import { companyProcedure, createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { AccountRepository } from "@/server/account";
import { JournalRepository } from "@/server/journal/journal.repository";
import { CreateJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { GetAllJournalUseCase } from "@/server/journal/use-cases/get-all-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail";
import { TransactionService } from "@/server/services";

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
        return await createJournalUseCase.execute({
          ...input,
          companyId: ctx.session.user.companyId,
        });
      });
    }),
  getAll: companyProcedure
    .input(getAllJournalQuerySchema)
    .query(async ({ ctx, input }) => {
      const getAllJournalUseCase = new GetAllJournalUseCase();
      return await getAllJournalUseCase.execute({
        ...input,
        include: { JournalDetail: true },
        companyId: ctx.session.user.companyId,
      });
    }),
});

export type JournalRouterOutputs = inferRouterOutputs<typeof journalRouter>;

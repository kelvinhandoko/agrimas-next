import { cursorJournalQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { JournalRepository } from "@/server/journal/journal.repository";
import { getInfiniteJournalUseCase } from "@/server/journal/use-cases/get-infinite-journal.use-case";

export const getInfiniteJournalController = companyProcedure
  .input(cursorJournalQuerySchema)
  .query(async ({ ctx, input }) => {
    const journalRepo = new JournalRepository(ctx.db);
    const getAllJournal = getInfiniteJournalUseCase(journalRepo);
    return await getAllJournal({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

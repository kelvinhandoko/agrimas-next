import { paginatedJournalQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { JournalRepository } from "@/server/journal/journal.repository";
import { getPaginatedJournalUseCase } from "@/server/journal/use-cases/get-paginated-journal.use-case";

export const getPaginatedJournalController = companyProcedure
  .input(paginatedJournalQuerySchema)
  .query(async ({ ctx, input }) => {
    const journalRepo = new JournalRepository(ctx.db);
    const getAllJournal = getPaginatedJournalUseCase(journalRepo);
    return await getAllJournal({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

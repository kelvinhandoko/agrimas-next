import { getAllJournalQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { JournalRepository } from "@/server/journal/journal.repository";
import { getAllJournalUseCase } from "@/server/journal/use-cases";

export const getAllJournalController = companyProcedure
  .input(getAllJournalQuerySchema)
  .query(async ({ ctx, input }) => {
    const journalRepo = new JournalRepository(ctx.db);
    const getAllJournal = getAllJournalUseCase(journalRepo);
    return await getAllJournal({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

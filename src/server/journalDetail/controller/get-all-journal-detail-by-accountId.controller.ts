import { getAllJournalDetailQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { db } from "@/server/db/prisma";
import { JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";
import { getAllJournalDetailByAccountIdUseCase } from "@/server/journalDetail/use-cases";

export const getAllJournalDetailByAccountIdController = companyProcedure
  .input(getAllJournalDetailQuerySchema)
  .query(async ({ ctx, input }) => {
    const journalDetailRepo = new JournalDetailRepository(db);
    const getJournalDetail =
      getAllJournalDetailByAccountIdUseCase(journalDetailRepo);
    return await getJournalDetail({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

import { type GetAllJournalDetailQuery } from "@/model";

import { type JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";

export const getAllJournalDetailByAccountIdUseCase =
  (journalDetailRepo: JournalDetailRepository) =>
  async (query: GetAllJournalDetailQuery) => {
    return await journalDetailRepo.getAllByAccountId({
      ...query,
      include: { journal: true, account: true, subAccount: true },
    });
  };

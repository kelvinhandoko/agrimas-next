import { type GetAllJournalQuery } from "@/model";

import { type JournalRepository } from "@/server/journal/journal.repository";

export const getAllJournalUseCase =
  (journalRepo: JournalRepository) =>
  async (payload: GetAllJournalQuery<{ JournalDetail: true }>) => {
    return await journalRepo.getAll(payload);
  };

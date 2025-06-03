import { type PaginatedJournalQuery } from "@/model";

import { type JournalRepository } from "@/server/journal/journal.repository";

export const getAllJournalUseCase =
  (journalRepo: JournalRepository) =>
  async (payload: PaginatedJournalQuery) => {
    return await journalRepo.get(payload);
  };

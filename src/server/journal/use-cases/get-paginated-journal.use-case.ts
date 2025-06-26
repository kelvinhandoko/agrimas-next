import { type PaginatedJournalQuery } from "@/model";

import { type JournalRepository } from "@/server/journal/journal.repository";

export const getPaginatedJournalUseCase =
  (journalRepo: JournalRepository) => async (q: PaginatedJournalQuery) => {
    return await journalRepo.getPaginated(q);
  };

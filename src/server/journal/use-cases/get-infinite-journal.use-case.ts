import { type CursorJournalQuery } from "@/model";

import { type JournalRepository } from "@/server/journal/journal.repository";

export const getInfiniteJournalUseCase =
  (journalRepo: JournalRepository) => async (payload: CursorJournalQuery) => {
    return await journalRepo.getInfinite(payload);
  };

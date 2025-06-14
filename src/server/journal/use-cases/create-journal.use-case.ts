import { type JournalPayload } from "@/model/journal.model";

import { type JournalRepository } from "@/server/journal/journal.repository";

export const createJournalUseCase =
  (journalRepo: JournalRepository) =>
  async (payload: Omit<JournalPayload, "details">) => {
    return await journalRepo.create(payload);
  };

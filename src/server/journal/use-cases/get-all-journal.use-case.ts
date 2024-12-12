import { GetAllJournalQuery } from "@/model";
import { Prisma } from "@prisma/client";

import { db } from "@/server/db/prisma";
import { JournalRepository } from "@/server/journal/journal.repository";

export class GetAllJournalUseCase {
  async execute<T extends Prisma.JournalInclude>(
    payload: GetAllJournalQuery<T>,
  ) {
    const journalRepo = new JournalRepository(db);
    return await journalRepo.getAll(payload);
  }
}

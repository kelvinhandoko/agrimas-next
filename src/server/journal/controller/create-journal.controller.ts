import { type JournalPayload } from "@/server/journal/journal.model";
import { type JournalRepository } from "@/server/journal/journal.repository";
import { type JournalDetailRepository } from "@/server/journalDetail";

export class CreateJournalController {
  constructor(
    private readonly _journalRepo: JournalRepository,
    private readonly _journalDetailRepo: JournalDetailRepository,
  ) {}
  async execute(payload: JournalPayload) {
    const { details, ...otherPayload } = payload;
    const createdJournal = await this._journalRepo.create(otherPayload);
    await Promise.all(
      details.map(async (detail) => {
        await this._journalDetailRepo.create({
          ...detail,
          journalId: createdJournal.id,
        });
      }),
    );
  }
}

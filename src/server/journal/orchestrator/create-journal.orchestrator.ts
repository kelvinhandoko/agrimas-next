import { type JournalPayload } from "@/model";

import { type CreateGeneralLedgerUseCase } from "@/server/generalLedger/use-cases/create-general-ledger.use-case";
import { type CreateJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { type CreateJournalDetailUseCase } from "@/server/journalDetail/use-cases/create-journal-detail.use-case";

export const createJournalOrchestrator =
  (usecases: {
    createJournalUseCase: CreateJournalUseCase;
    createJournalDetailUseCase: CreateJournalDetailUseCase;
    createGeneralLedgerUseCase: CreateGeneralLedgerUseCase;
  }) =>
  async (payload: JournalPayload) => {
    const {
      createJournalUseCase,
      createJournalDetailUseCase,
      createGeneralLedgerUseCase,
    } = usecases;
    const createdJournal = await createJournalUseCase(payload);
    await Promise.all(
      payload.details.map(async (d) => {
        const createdDetail = await createJournalDetailUseCase({
          ...d,
          journalId: createdJournal.id,
        });
        await createGeneralLedgerUseCase({
          accountId: createdDetail.accountId,
          companyId: createdJournal.companyId,
          journalDetailId: createdDetail.id,
          amount: createdDetail.debit - createdDetail.credit,
        });
      }),
    );
    return createdJournal;
  };

import { type AccountRepository } from "@/server/account";
import { type JournalPayload } from "@/server/journal/journal.model";
import { type JournalRepository } from "@/server/journal/journal.repository";
import { type JournalDetailRepository } from "@/server/journalDetail";
import { TRPCError } from "@trpc/server";

export class CreateJournalUseCase {
  constructor(
    private readonly _journalRepo: JournalRepository,
    private readonly _journalDetailRepo: JournalDetailRepository,
    private readonly _accountRepo: AccountRepository,
  ) {}
  async execute(payload: JournalPayload) {
    const { details, ...otherPayload } = payload;
    const creditTotal = details.reduce((acc, curr) => acc + curr.credit, 0);
    const debitTotal = details.reduce((acc, curr) => acc + curr.debit, 0);
    const checkBalance = creditTotal === debitTotal;
    if (!checkBalance) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "debit dan kredit tidak balance",
      });
    }
    const createdJournal = await this._journalRepo.create(otherPayload);
    await Promise.all(
      details.map(async (detail) => {
        const findAccount = await this._accountRepo.getDetail({
          id: detail.accountId,
        });
        if (!findAccount) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "nama akun tidak ditemukan",
          });
        }
      }),
    );
    const detailsWithJournalId = details.map((detail) => ({
      ...detail,
      journalId: createdJournal.id,
    }));
    await this._journalDetailRepo.createMany(detailsWithJournalId);
  }
}

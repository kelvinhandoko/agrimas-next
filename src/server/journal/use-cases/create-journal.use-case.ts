import { type JournalPayload } from "@/model/journal.model";
import { TRPCError } from "@trpc/server";

import { type AccountRepository } from "@/server/account";
import { type JournalRepository } from "@/server/journal/journal.repository";
import { type JournalDetailRepository } from "@/server/journalDetail";

export const createJournalUseCase =
  (
    journalRepo: JournalRepository,
    journalDetailRepo: JournalDetailRepository,
    accountRepo: AccountRepository,
  ) =>
  async (payload: JournalPayload) => {
    const { details, ...otherPayload } = payload;

    const createdJournal = await journalRepo.create(otherPayload);
    await Promise.all(
      details.map(async (detail) => {
        const findAccount = await accountRepo.getDetail({
          id: detail.accountId,
        });
        if (!findAccount) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "nama akun tidak ditemukan",
          });
        }
        const updatedBalance =
          findAccount.currentBalance +
          (findAccount.posisi === "DEBIT"
            ? detail.debit - detail.credit
            : -detail.debit + detail.credit);
        if (updatedBalance < 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `saldo ${findAccount.name} tidak cukup`,
          });
        }
        await accountRepo.updateBalance({
          id: findAccount.id,
          balance: updatedBalance,
        });
      }),
    );
    const detailsWithJournalId = details.map((detail) => ({
      ...detail,
      journalId: createdJournal.id,
    }));
    await journalDetailRepo.createMany(detailsWithJournalId);
  };

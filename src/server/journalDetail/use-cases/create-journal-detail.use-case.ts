import { type JournalDetailPayload } from "@/model";
import { TRPCError } from "@trpc/server";

import { type AccountRepository } from "@/server/account";
import { type JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";

export const createJournalDetailUseCase =
  (repos: {
    journalDetailRepo: JournalDetailRepository;
    accountRepo: AccountRepository;
  }) =>
  async (payload: JournalDetailPayload) => {
    const { journalDetailRepo, accountRepo } = repos;

    const findAccount = await accountRepo.getDetail({
      id: payload.accountId,
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
        ? payload.debit - payload.credit
        : -payload.debit + payload.credit);

    if (updatedBalance < 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `saldo ${findAccount.name} tidak cukup`,
      });
    }

    await accountRepo.updateBalance({
      id: payload.accountId,
      balance: updatedBalance,
    });

    return await journalDetailRepo.create(payload);
  };

export type CreateJournalDetailUseCase = ReturnType<
  typeof createJournalDetailUseCase
>;

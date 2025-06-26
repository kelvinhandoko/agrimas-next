import { type JournalPayload } from "@/model/journal.model";
import { TRPCError } from "@trpc/server";

import { type JournalRepository } from "@/server/journal/journal.repository";

export const createJournalUseCase =
  (journalRepo: JournalRepository) => async (payload: JournalPayload) => {
    const { creditTotal, debitTotal } = payload.details.reduce(
      (acc, curr) => {
        acc.debitTotal += curr.debit;
        acc.creditTotal += curr.credit;
        return acc;
      },
      {
        debitTotal: 0,
        creditTotal: 0,
      },
    );
    if (creditTotal !== debitTotal) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "debit dan kredit tidak balance",
      });
    }
    return await journalRepo.create(payload);
  };

export type CreateJournalUseCase = ReturnType<typeof createJournalUseCase>;

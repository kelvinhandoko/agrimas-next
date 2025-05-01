import { type AccountPayload } from "@/model/account.model";
import { TRPCError } from "@trpc/server";

import { AccountRepository } from "@/server/account/account.repository";
import { db } from "@/server/db/prisma";
import { TransactionService } from "@/server/services/transaction.service";

export class UpdateAccountUseCase {
  async execute(payload: AccountPayload) {
    const transactionService = new TransactionService(db);
    return await transactionService.startTransaction(async (tx) => {
      const accountRepo = new AccountRepository(tx);
      const data = await accountRepo.getDetail({
        id: payload.id!,
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "akun tidak ditemukan",
        });
      }

      return data;
    });
  }
}

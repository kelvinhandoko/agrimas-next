import { companyProcedure } from "@/trpc/trpc";
import { z } from "zod";

import { AccountRepository } from "@/server/account/account.repository";
import { deleteAccountUseCase } from "@/server/account/use-cases/delete-account.use-case";
import { TransactionService } from "@/server/services";

export const deleteAccountController = companyProcedure
  .input(z.string())
  .mutation(async ({ input, ctx }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const accountRepo = new AccountRepository(tx);
      const data = await deleteAccountUseCase(accountRepo)(input);
      return data;
    });
  });

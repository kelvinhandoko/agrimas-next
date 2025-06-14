import { accountPayloadSchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account/account.repository";
import { updateAccountUseCase } from "@/server/account/use-cases/update-account.use-case";
import { TransactionService } from "@/server/services";

export const updateAccountController = companyProcedure
  .input(accountPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const accountRepo = new AccountRepository(tx);
      const data = await updateAccountUseCase(accountRepo)({
        ...input,
        companyId: ctx.session.user.companyId,
      });
      return data;
    });
  });

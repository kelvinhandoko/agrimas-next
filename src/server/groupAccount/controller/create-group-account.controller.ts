import { groupAccountPayloadSchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { GroupAccountRepository } from "@/server/groupAccount/group-account.repository";
import { createGroupAccountUseCase } from "@/server/groupAccount/use-cases/create-group-account.use-case";
import { TransactionService } from "@/server/services";

export const createGroupAccountController = companyProcedure
  .input(groupAccountPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const groupAccountRepo = new GroupAccountRepository(tx);
      const createGroupAccount = createGroupAccountUseCase(groupAccountRepo);
      return await createGroupAccount({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });

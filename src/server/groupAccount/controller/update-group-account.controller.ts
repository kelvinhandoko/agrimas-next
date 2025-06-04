import { groupAccountPayloadSchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { GroupAccountRepository } from "@/server/groupAccount/group-account.repository";
import { updateGroupAccountUseCase } from "@/server/groupAccount/use-cases/update-group-account.use-case";
import { TransactionService } from "@/server/services";

export const updateGroupAccountController = companyProcedure
  .input(groupAccountPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const groupAccountRepo = new GroupAccountRepository(tx);
      const createGroupAccount = updateGroupAccountUseCase(groupAccountRepo);
      return await createGroupAccount({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });

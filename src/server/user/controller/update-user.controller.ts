import { userPayloadSchema } from "@/model";
import { ownerCompanyProcedure } from "@/trpc/trpc";

import { TransactionService } from "@/server/services";
import { updateUserUseCase } from "@/server/user/use-cases/update-user.use-case";
import { UserRepository } from "@/server/user/user.repository";

export const updateUserController = ownerCompanyProcedure
  .input(userPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return transactionService.startTransaction(async (tx) => {
      const userRepo = new UserRepository(tx);
      const updateUser = await updateUserUseCase(userRepo)({
        ...input,
      });
      return updateUser;
    });
  });

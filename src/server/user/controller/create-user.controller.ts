import { userPayloadSchema } from "@/model";
import { ownerCompanyProcedure } from "@/trpc/trpc";

import { TransactionService } from "@/server/services";
import { createUserUseCase } from "@/server/user/use-cases/create-user.use-case";
import { UserRepository } from "@/server/user/user.repository";
import { UserCompanyRepository } from "@/server/userCompany/user-company.repository";

export const createUserController = ownerCompanyProcedure
  .meta({ /* 👉 */ description: "This shows in the panel." })
  .input(userPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return transactionService.startTransaction(async (tx) => {
      const userRepo = new UserRepository(tx);
      const userCompanyRepo = new UserCompanyRepository(tx);
      const createUser = await createUserUseCase(
        userRepo,
        userCompanyRepo,
      )({ ...input, companyId: ctx.session.user.companyId });
      return createUser;
    });
  });

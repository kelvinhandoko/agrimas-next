import { adminCompanyProcedure } from "@/trpc/trpc";
import { z } from "zod";

import { TransactionService } from "@/server/services";
import { deleteUserUseCase } from "@/server/user/use-cases/delete-user.use-case";
import { UserRepository } from "@/server/user/user.repository";
import { deleteUserCompanyUseCase } from "@/server/userCompany/use-cases/delete-user-company.use-case";
import { UserCompanyRepository } from "@/server/userCompany/user-company.repository";

export const deleteUserController = adminCompanyProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const userRepo = new UserRepository(tx);
      const userCompanyRepo = new UserCompanyRepository(tx);
      const deleteUser = await deleteUserUseCase(userRepo)(input);
      await deleteUserCompanyUseCase(userCompanyRepo)(
        deleteUser.userCompany[0]?.id ?? "",
      );
    });
  });

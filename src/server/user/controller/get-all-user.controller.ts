import { UserGetAllQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { getAllUserUseCase } from "@/server/user/use-cases/get-all-user.use-case";
import { UserRepository } from "@/server/user/user.repository";

export const getAllUserController = companyProcedure
  .input(UserGetAllQuerySchema)
  .query(async ({ ctx, input }) => {
    const userRepo = new UserRepository(ctx.db);
    const getAllUser = getAllUserUseCase(userRepo);
    return getAllUser({ ...input, companyId: ctx.session.user.companyId });
  });

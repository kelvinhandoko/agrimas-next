import { companyProcedure } from "@/trpc/trpc";
import { z } from "zod";

import { GetUserByIdUseCase } from "@/server/user/use-cases";
import { UserRepository } from "@/server/user/user.repository";

export const getDetailUserController = companyProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const userRepo = new UserRepository(ctx.db);
    const getUserDetail = new GetUserByIdUseCase(userRepo);
    return getUserDetail.execute(input);
  });

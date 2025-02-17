import {
  getAllGroupAccountQuerySchema,
  groupAccountPayloadSchema,
} from "@/model/group-account.model";
import { companyProcedure, createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { GroupAccountRepository } from "@/server/groupAccount/group-account.repository";
import { createGroupAccountUseCase } from "@/server/groupAccount/use-cases/create-group-account.use-case";
import { GetAllGroupAccountUseCase } from "@/server/groupAccount/use-cases/get-all-group-account.use-case";

export const groupAccountRouter = createTRPCRouter({
  create: companyProcedure
    .input(groupAccountPayloadSchema)
    .mutation(async ({ ctx, input }) => {
      const groupAccountRepo = new GroupAccountRepository(ctx.db);
      const createGroupAccount = createGroupAccountUseCase(groupAccountRepo);
      return await createGroupAccount({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    }),

  getAll: companyProcedure
    .input(getAllGroupAccountQuerySchema)
    .query(async ({ ctx, input }) => {
      const getAllGroupAccountUseCase = new GetAllGroupAccountUseCase();
      return await getAllGroupAccountUseCase.execute({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    }),
});

export type GroupAccountRouterOutputs = inferRouterOutputs<
  typeof groupAccountRouter
>;

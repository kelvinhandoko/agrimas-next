import {
  getAllGroupAccountQuerySchema,
  groupAccountPayloadSchema,
} from "@/server/groupAccount/group-account.model";
import { CreateGroupAccountUseCase } from "@/server/groupAccount/use-cases/create-group-account.use-case";
import { GetAllGroupAccountUseCase } from "@/server/groupAccount/use-cases/get-all-group-account.use-case";
import { companyProcedure, createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

export const groupAccountRouter = createTRPCRouter({
  create: companyProcedure
    .input(groupAccountPayloadSchema)
    .mutation(async ({ ctx, input }) => {
      const createGroupAccountUseCase = new CreateGroupAccountUseCase();
      return await createGroupAccountUseCase.execute({
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

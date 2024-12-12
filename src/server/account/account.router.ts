import {
  accountPayloadSchema,
  getAllAccountQuerySchema,
} from "@/model/account.model";
import { companyProcedure, createTRPCRouter } from "@/trpc/trpc";

import {
  CreateAccountUseCase,
  GetAllAccountUseCase,
} from "@/server/account/use-cases";

export const accountRouter = createTRPCRouter({
  create: companyProcedure
    .input(accountPayloadSchema.omit({ companyId: true }))
    .mutation(async ({ input, ctx }) => {
      const createAccountUseCase = new CreateAccountUseCase();
      return createAccountUseCase.execute({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    }),
  getAll: companyProcedure
    .input(getAllAccountQuerySchema)
    .mutation(async ({ input, ctx }) => {
      const getAllAccountUseCase = new GetAllAccountUseCase();
      return getAllAccountUseCase.execute({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    }),
});

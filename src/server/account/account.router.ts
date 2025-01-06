import {
  accountPayloadSchema,
  getAllAccountQuerySchema,
} from "@/model/account.model";
import { companyProcedure, createTRPCRouter } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account/account.repository";
import {
  GetAllAccountUseCase,
  createAccountUseCase,
} from "@/server/account/use-cases";
import { ReportRepository } from "@/server/report/report.repository";

export const accountRouter = createTRPCRouter({
  create: companyProcedure
    .input(accountPayloadSchema.omit({ companyId: true }))
    .mutation(async ({ input, ctx }) => {
      const accountRepo = new AccountRepository(ctx.db);
      const reportRepo = new ReportRepository(ctx.db);
      const createAccount = createAccountUseCase(accountRepo, reportRepo);
      return createAccount({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    }),
  getAll: companyProcedure
    .input(getAllAccountQuerySchema)
    .query(async ({ input, ctx }) => {
      const getAllAccountUseCase = new GetAllAccountUseCase();
      return getAllAccountUseCase.execute({
        ...input,
        include: { groupAccount: true },
        companyId: ctx.session.user.companyId,
      });
    }),
});

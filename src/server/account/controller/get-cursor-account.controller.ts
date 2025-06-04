import { cursoredAccountQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account/account.repository";
import { getCursorAccountUseCase } from "@/server/account/use-cases/get-cursor-account.use-case";

export const getCursorAccountController = companyProcedure
  .input(cursoredAccountQuerySchema)
  .query(async ({ input, ctx }) => {
    const accountRepo = new AccountRepository(ctx.db);
    const data = await getCursorAccountUseCase(accountRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
    return data;
  });

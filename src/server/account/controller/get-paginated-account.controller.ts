import { getPaginatedAccountQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account/account.repository";
import { getPaginatedAccountUseCase } from "@/server/account/use-cases/get-paginated-account.use-case";

export const getPaginatedAccountController = companyProcedure
  .input(getPaginatedAccountQuerySchema)
  .query(async ({ input, ctx }) => {
    const accountRepo = new AccountRepository(ctx.db);
    const data = await getPaginatedAccountUseCase(accountRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
    return data;
  });

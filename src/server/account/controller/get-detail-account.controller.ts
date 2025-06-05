import { getDetailAccountQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account/account.repository";
import { getDetailAccountUseCase } from "@/server/account/use-cases/get-detail-account.use-case";

export const getDetailAccountController = companyProcedure
  .input(getDetailAccountQuerySchema)
  .query(async ({ input, ctx }) => {
    const accountRepo = new AccountRepository(ctx.db);
    const data = await getDetailAccountUseCase(accountRepo)({
      ...input,
    });
    return data;
  });

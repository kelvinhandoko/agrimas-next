import { getCursorGroupAccountQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { GroupAccountRepository } from "@/server/groupAccount/group-account.repository";
import { getInfiniteGroupAccountUseCase } from "@/server/groupAccount/use-cases/get-infinite-group-account.use-case";

export const getInfiniteGroupAccountController = companyProcedure
  .input(getCursorGroupAccountQuerySchema)
  .query(async ({ ctx, input }) => {
    const groupAccountRepo = new GroupAccountRepository(ctx.db);
    return await getInfiniteGroupAccountUseCase(groupAccountRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

import { getPaginatedGroupAccountQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { GroupAccountRepository } from "@/server/groupAccount/group-account.repository";
import { getGroupAccountUseCase } from "@/server/groupAccount/use-cases/get-group-account.use-case";

export const getGroupAccountController = companyProcedure
  .input(getPaginatedGroupAccountQuerySchema)
  .query(async ({ ctx, input }) => {
    const groupAccountRepo = new GroupAccountRepository(ctx.db);
    return await getGroupAccountUseCase(groupAccountRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });

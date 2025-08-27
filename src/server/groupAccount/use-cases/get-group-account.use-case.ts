import { type GetPaginatedGroupAccountQuery } from "@/model";

import { type GroupAccountRepository } from "@/server/groupAccount/group-account.repository";

export const getGroupAccountUseCase =
  (repo: GroupAccountRepository) => async (q: GetPaginatedGroupAccountQuery) =>
    await repo.get(q);

export type IGetGroupAccountUseCase = ReturnType<typeof getGroupAccountUseCase>;

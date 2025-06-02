import { type GetCursorGroupAccountQuery } from "@/model";

import { type GroupAccountRepository } from "@/server/groupAccount/group-account.repository";

export const getInfiniteGroupAccountUseCase =
  (repo: GroupAccountRepository) => async (q: GetCursorGroupAccountQuery) =>
    await repo.getInfinite(q);

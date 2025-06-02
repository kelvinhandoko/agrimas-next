import { type CursoredAccountQuery } from "@/model";

import { type AccountRepository } from "@/server/account/account.repository";

export const getCursorAccountUseCase =
  (repo: AccountRepository) => async (query: CursoredAccountQuery) => {
    const data = await repo.getCursored(query);
    return data;
  };

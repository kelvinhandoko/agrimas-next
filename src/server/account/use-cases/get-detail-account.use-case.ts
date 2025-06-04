import { type GetDetailAccountQuery } from "@/model/account.model";

import { type AccountRepository } from "@/server/account/account.repository";

export const getDetailAccountUseCase =
  (repo: AccountRepository) => async (q: GetDetailAccountQuery) => {
    const data = await repo.getDetail(q);
    return data;
  };

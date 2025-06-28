import { type PaginatedAccountQuery } from "@/model";

import { type AccountRepository } from "@/server/account/account.repository";

export const getPaginatedAccountUseCase =
  (repo: AccountRepository) => async (query: PaginatedAccountQuery) => {
    const data = await repo.getPaginated(query);
    return data;
  };

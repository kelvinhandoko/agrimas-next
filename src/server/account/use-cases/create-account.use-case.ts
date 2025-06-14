import { type AccountPayload } from "@/model/account.model";

import { type AccountRepository } from "@/server/account/account.repository";

export const createAccountUseCase =
  (accountRepo: AccountRepository) => async (payload: AccountPayload) => {
    const data = await accountRepo.create(payload);

    return data;
  };

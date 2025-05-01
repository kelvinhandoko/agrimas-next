import { type AccountPayload } from "@/model/account.model";

import { type AccountRepository } from "@/server/account/account.repository";

export const createAccountBatchUseCase =
  (accountRepo: AccountRepository) =>
  async (payload: Array<AccountPayload>) => {
    const data = await accountRepo.createBatch(payload);

    return data;
  };

import { type DefaultAccountPayload } from "@/model/default-account.model";

import { type DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";

export const createBulkDefaultAccountUseCase =
  (defaultAccountRepo: DefaultAccountRepository) =>
  async (payload: DefaultAccountPayload[]) => {
    return await defaultAccountRepo.createBulk(payload);
  };

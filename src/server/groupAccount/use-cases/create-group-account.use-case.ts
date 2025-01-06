import { type GroupAccountPayload } from "@/model/group-account.model";

import { type GroupAccountRepository } from "@/server/groupAccount/group-account.repository";

export const createGroupAccountUseCase =
  (groupAccountRepo: GroupAccountRepository) =>
  async (payload: GroupAccountPayload) => {
    return await groupAccountRepo.create(payload);
  };

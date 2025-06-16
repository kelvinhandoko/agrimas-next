import { type GroupAccountPayload } from "@/model/group-account.model";

import { type GroupAccountRepository } from "@/server/groupAccount/group-account.repository";

export const updateGroupAccountUseCase =
  (groupAccountRepo: GroupAccountRepository) =>
  async (payload: GroupAccountPayload) => {
    return await groupAccountRepo.update(payload);
  };

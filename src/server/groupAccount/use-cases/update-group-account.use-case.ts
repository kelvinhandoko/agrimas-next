import { type GroupAccountPayload } from "@/model/group-account.model";

import { db } from "@/server/db/prisma";
import { GroupAccountRepository } from "@/server/groupAccount/group-account.repository";

export class UpdateGroupAccountUseCase {
  async execute(payload: GroupAccountPayload) {
    const groupAccountRepo = new GroupAccountRepository(db);
    return await groupAccountRepo.update(payload);
  }
}

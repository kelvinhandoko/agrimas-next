import { db } from "@/server/db/prisma";
import { type GroupAccountPayload } from "@/server/groupAccount/group-account.model";
import { GroupAccountRepository } from "@/server/groupAccount/group-account.repository";

export class UpdateGroupAccountController {
  async execute(payload: GroupAccountPayload) {
    const groupAccountRepo = new GroupAccountRepository(db);
    return await groupAccountRepo.update(payload);
  }
}

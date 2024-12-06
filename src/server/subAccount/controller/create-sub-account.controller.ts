import { db } from "@/server/db/prisma";
import { type SubAccountPayload } from "@/server/subAccount/sub-account.model";
import { SubAccountRepository } from "@/server/subAccount/sub-account.repository";

export class CreateSubAccountController {
  async execute(payload: SubAccountPayload) {
    const subAccountRepo = new SubAccountRepository(db);
    return await subAccountRepo.create(payload);
  }
}

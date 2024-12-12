import { type SubAccountPayload } from "@/model/sub-account.model";

import { db } from "@/server/db/prisma";
import { SubAccountRepository } from "@/server/subAccount/sub-account.repository";

export class CreateSubAccountUseCase {
  async execute(payload: SubAccountPayload) {
    const subAccountRepo = new SubAccountRepository(db);
    return await subAccountRepo.create(payload);
  }
}

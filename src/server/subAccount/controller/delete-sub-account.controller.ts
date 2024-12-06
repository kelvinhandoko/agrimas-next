import { db } from "@/server/db/prisma";
import { SubAccountRepository } from "@/server/subAccount/sub-account.repository";

export class DeleteSubAccountController {
  async execute(id: string) {
    const subAccountRepo = new SubAccountRepository(db);
    return await subAccountRepo.delete(id);
  }
}

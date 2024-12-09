import { AccountRepository } from "@/server/account/account.repository";
import { db } from "@/server/db/prisma";

export class DeleteAccountUseCase {
  async execute(id: string) {
    const accountRepo = new AccountRepository(db);
    return await accountRepo.delete(id);
  }
}

import { type GetDetailAccountQuery } from "@/server/account/account.model";
import { AccountRepository } from "@/server/account/account.repository";
import { db } from "@/server/db/prisma";

export class GetDetailAccountUseCase {
  async execute<S>(query: GetDetailAccountQuery<S>) {
    const accountRepo = new AccountRepository(db);
    return await accountRepo.getDetail(query);
  }
}

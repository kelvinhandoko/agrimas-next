import { type GetAllAccountQuery } from "@/model/account.model";
import { type Prisma } from "@prisma/client";

import { AccountRepository } from "@/server/account/account.repository";
import { db } from "@/server/db/prisma";

export class GetAllAccountUseCase {
  async execute<S extends Prisma.AccountInclude>(query: GetAllAccountQuery<S>) {
    const accountRepo = new AccountRepository(db);
    return await accountRepo.getAll(query);
  }
}

import { type GetAllAccountQuery } from "@/server/account/account.model";
import { AccountRepository } from "@/server/account/account.repository";
import { db } from "@/server/db/prisma";
import { type Prisma } from "@prisma/client";

export class GetAllAccountController {
  async execute<S>(query: GetAllAccountQuery<S>) {
    const accountRepo = new AccountRepository(db);
    return await accountRepo.getAll({
      ...query,
      include: { company: { include: { groupAccount: true } } },
    });
  }
}

import { type GetAllGroupAccountQuery } from "@/model/group-account.model";
import { type Prisma } from "@prisma/client";

import { db } from "@/server/db/prisma";
import { GroupAccountRepository } from "@/server/groupAccount/group-account.repository";

export class GetAllGroupAccountUseCase {
  async execute<S extends Prisma.GroupAccountInclude>(
    query: GetAllGroupAccountQuery<S>,
  ) {
    const groupAccountRepo = new GroupAccountRepository(db);
    return await groupAccountRepo.getAll(query);
  }
}

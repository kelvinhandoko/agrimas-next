import { db } from "@/server/db/prisma";
import { type GetAllGroupAccountQuery } from "@/server/groupAccount/group-account.model";
import { GroupAccountRepository } from "@/server/groupAccount/group-account.repository";
import { type Prisma } from "@prisma/client";

export class GetAllGroupAccountUseCase {
  async execute<S extends Prisma.GroupAccountInclude>(
    query: GetAllGroupAccountQuery<S>,
  ) {
    const groupAccountRepo = new GroupAccountRepository(db);
    return await groupAccountRepo.getAll(query);
  }
}

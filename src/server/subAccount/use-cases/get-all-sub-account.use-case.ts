import { type GetAllAccountQuery } from "@/model/account.model";

import { db } from "@/server/db/prisma";
import { SubAccountRepository } from "@/server/subAccount/sub-account.repository";

export class GetAllSubAccountUseCase {
  async execute<S>(query: GetAllAccountQuery<S>) {
    const subAccountRepo = new SubAccountRepository(db);
    return await subAccountRepo.getAll(query);
  }
}

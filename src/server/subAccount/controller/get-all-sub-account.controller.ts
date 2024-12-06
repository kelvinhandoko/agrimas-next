import { type GetAllAccountQuery } from "@/server/account/account.model";
import { db } from "@/server/db/prisma";
import { SubAccountRepository } from "@/server/subAccount/sub-account.repository";

export class GetAllSubAccountController {
  async execute<S>(query: GetAllAccountQuery<S>) {
    const subAccountRepo = new SubAccountRepository(db);
    return await subAccountRepo.getAll(query);
  }
}

import { type GetDetailAccountQuery } from "@/server/account/account.model";
import { db } from "@/server/db/prisma";
import { SubAccountRepository } from "@/server/subAccount/sub-account.repository";

export class GetDetailAccountController {
  async execute<S>(query: GetDetailAccountQuery<S>) {
    const subAccountRepo = new SubAccountRepository(db);
    return await subAccountRepo.getDetail(query);
  }
}

import { type DefaultAccountPayload } from "@/model/default-account.model";

import { BaseRepository } from "@/server/common";

export class DefaultAccountRepository extends BaseRepository {
  async createBulk(payload: DefaultAccountPayload[]) {
    return await this._db.defaultAccount.createMany({ data: payload });
  }
  async create(payload: DefaultAccountPayload) {
    return await this._db.defaultAccount.create({ data: payload });
  }

  async getByCompany(companyId: string) {
    return await this._db.defaultAccount.findMany({
      where: { companyId },
    });
  }
}

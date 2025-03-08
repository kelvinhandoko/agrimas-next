import { type DefaultAccountPayload } from "@/model/default-account.model";

import { BaseRepository } from "@/server/common";

export class DefaultAccountRepository extends BaseRepository {
  async createBulk(payload: DefaultAccountPayload[]) {
    await this._db.defaultAccount.createMany({ data: payload });
  }
  async create(payload: DefaultAccountPayload) {
    await this._db.defaultAccount.create({ data: payload });
  }
}

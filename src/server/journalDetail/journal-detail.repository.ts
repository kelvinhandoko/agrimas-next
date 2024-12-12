import { type JournalDetailPayload } from "@/model/journal-detail.model";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class JournalDetailRepository extends BaseRepository {
  async create(payload: JournalDetailPayload) {
    return await this._db.journalDetail.create({
      data: payload,
    });
  }
  async createMany(payload: Array<JournalDetailPayload>) {
    return await this._db.journalDetail.createMany({
      data: payload,
    });
  }
}

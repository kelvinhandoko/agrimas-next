import { type ErrorLogPayload } from "@/model/errorLog.model";

import { BaseRepository } from "@/server/common";

export class ErrorLogRepository extends BaseRepository {
  async createLog(payload: ErrorLogPayload) {
    return await this._db.errorLog.create({ data: payload });
  }
}

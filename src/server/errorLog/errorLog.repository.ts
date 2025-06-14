import { type ErrorLogPayload } from "@/model/errorLog.model";

import { BaseRepository } from "@/server/common";

export class ErrorLogRepository extends BaseRepository {
  async createLog(payload: ErrorLogPayload) {
    const formattedMessage =
      payload.message.length > 100
        ? payload.message.slice(0, 100)
        : payload.message;
    return await this._db.errorLog.create({
      data: { ...payload, message: formattedMessage },
    });
  }
}

import { type JournalPayload } from "@/model/journal.model";
import { convertType } from "@/utils/journalTypeHelper";
import { type JournalType } from "@prisma/client";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class JournalRepository extends BaseRepository {
  private async _generateRef(type: JournalType) {
    const findData = await this._db.journal.findMany({
      where: {
        ref: { startsWith: convertType(type) },
      },
    });
    return `${convertType(type)}-${findData.length + 1}`;
  }
  async create(payload: Omit<JournalPayload, "details">) {
    return await this._db.journal.create({
      data: {
        ...payload,
        ref: payload.ref ?? (await this._generateRef(payload.type)),
      },
    });
  }
  async update(payload: Omit<JournalPayload, "details">) {
    return await this._db.journal.update({
      data: payload,
      where: { id: payload.id },
    });
  }
}

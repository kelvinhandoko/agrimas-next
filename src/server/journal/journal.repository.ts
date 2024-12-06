import { BaseRepository } from "@/server/common/repository/BaseRepository";
import { type JournalPayload } from "@/server/journal/journal.model";
import { convertType } from "@/utils/journalTypeHelper";
import { type JournalType } from "@prisma/client";

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
}

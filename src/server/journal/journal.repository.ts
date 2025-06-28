import { TIMEZONE } from "@/constant";
import {
  type CursoredJournalQuery,
  type GetJournalQuery,
  type JournalPayload,
  type PaginatedJournalQuery,
} from "@/model/journal.model";
import { type Prisma } from "@prisma/client";
import { DateTime } from "luxon";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class JournalRepository extends BaseRepository {
  async create(payload: Omit<JournalPayload, "details">) {
    const { companyId, date, type, description, ref } = payload;
    return await this._db.journal.create({
      data: {
        companyId,
        date,
        type,
        description,
        ref: ref?.length
          ? ref
          : (await this._createRef(companyId, "journal", "JO")).ref,
      },
    });
  }
  async update(payload: Omit<JournalPayload, "details">) {
    return await this._db.journal.update({
      data: payload,
      where: { id: payload.id },
    });
  }

  private async _getQuery(q: GetJournalQuery) {
    const { companyId, dateRange, search } = q;
    const whereClause: Prisma.JournalWhereInput = { companyId };

    if (search) {
      whereClause.OR = [
        {
          ref: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (dateRange) {
      const { from, to } = dateRange;
      whereClause.date = {
        gte: DateTime.fromISO(from).setZone(TIMEZONE).startOf("day").toJSDate(),
        lte: DateTime.fromISO(to).setZone(TIMEZONE).endOf("day").toJSDate(),
      };
    }

    return this._db.journal.paginate({
      where: whereClause,
      include: { JournalDetail: true },
      orderBy: { date: "desc" },
    });
  }

  async getPaginated(q: PaginatedJournalQuery) {
    const [data, meta] = await (
      await this._getQuery(q)
    ).withPages({
      limit: q.limit,
      page: q.page,
    });
    return { data, meta };
  }
  async getCursor(q: CursoredJournalQuery) {
    const [data, meta] = await (
      await this._getQuery(q)
    ).withCursor({
      limit: q.limit,
      after: q.cursor,
    });
    return { data, meta };
  }
}

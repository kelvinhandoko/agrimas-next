import { GetAllJournalQuery, type JournalPayload } from "@/model/journal.model";
import { convertType } from "@/utils/journalTypeHelper";
import { type JournalType, Prisma } from "@prisma/client";

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

  async getAll<T extends Prisma.JournalInclude>(query: GetAllJournalQuery<T>) {
    const {
      infiniteScroll,
      limit,
      page,
      cursor,
      takeAll,
      search,
      companyId,
      include,
    } = query;
    const whereClause: Prisma.JournalWhereInput = {};

    let cursorClause = undefined;

    whereClause.companyId = companyId;

    // state skip clause klo tidak infinite scroll
    let skipClause: number | undefined = (page - 1) * limit;

    let take = limit;

    if (infiniteScroll) {
      if (cursor) {
        cursorClause = { id: cursor };
      }
      take = limit + 1;
      skipClause = undefined;
    }
    if (search) {
      const splitSearch = search.split(" ");
      const formatedSearch = splitSearch.join(" & ");
      whereClause.OR = [
        {
          ref: { contains: search },
        },
      ];
    }

    const totalPromise = this._db.journal.count({ where: whereClause });
    const dataPromise = this._db.journal.findMany({
      where: whereClause,
      take: take,
      cursor: cursorClause,
      skip: skipClause,
      include: include ?? (undefined as unknown as T),
    });

    const [total, data] = await Promise.all([totalPromise, dataPromise]);
    let nextCursor: typeof cursor | undefined = undefined;
    if (!takeAll && data.length > limit) {
      const nextItem = data.pop();
      nextCursor = nextItem?.id;
    }
    return {
      data,
      meta: {
        totalData: total,
      },
      nextCursor,
    };
  }
}

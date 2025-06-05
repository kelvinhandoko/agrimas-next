import { TIMEZONE } from "@/constant";
import {
  type GetAllJournalQuery,
  type JournalPayload,
} from "@/model/journal.model";
import { convertType } from "@/utils/journalTypeHelper";
import { type JournalType, type Prisma } from "@prisma/client";
import { DateTime } from "luxon";
import { z } from "zod";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class JournalRepository extends BaseRepository {
  private async _generateRef(type: JournalType, companyId: string) {
    // Validate inputs
    const safeCompanyId = z
      .string()
      .regex(/^[a-zA-Z0-9_]+$/)
      .parse(companyId);
    const safeType = z
      .string()
      .regex(/^[a-zA-Z0-9_]+$/)
      .parse(convertType(type));

    const sequenceName =
      `journal_ref_${safeCompanyId}_${safeType}`.toLowerCase();
    const prefix = `${safeType}-${safeCompanyId}`;

    await this._db.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_class WHERE relname = '${sequenceName}'
        ) THEN
          CREATE SEQUENCE ${sequenceName} START 1;
        END IF;
      END;
      $$;
    `);

    const result = await this._db.$queryRawUnsafe<{ nextval: bigint }[]>(
      `SELECT nextval('${sequenceName}')`,
    );

    const next = result[0]?.nextval.toString().padStart(3, "0");
    return `${prefix}-${next}`;
  }

  async create(payload: Omit<JournalPayload, "details">) {
    return await this._db.journal.create({
      data: {
        ...payload,
        ref: payload.ref?.length
          ? payload.ref
          : await this._generateRef(payload.type, payload.companyId),
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
      from,
      to,
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
      whereClause.OR = [
        {
          ref: { contains: search },
        },
      ];
    }

    if (from && to) {
      const startDay = DateTime.fromISO(from, { zone: TIMEZONE })
        .startOf("day")
        .toJSDate();
      const endDay = DateTime.fromISO(to, { zone: TIMEZONE })
        .endOf("day")
        .toJSDate();
      whereClause.date = {
        gte: startDay,
        lte: endDay,
      };
    }

    const total = await this._db.journal.count({ where: whereClause });
    const data = await this._db.journal.findMany({
      where: whereClause,
      take: take,
      cursor: cursorClause,
      skip: skipClause,
      include: include ?? (undefined as unknown as T),
    });

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

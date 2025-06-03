import { TIMEZONE } from "@/constant";
import {
  type CursorJournalQuery,
  type GetAllJournalQuery,
  type JournalPayload,
  type PaginatedJournalQuery,
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

  private async _getQuery(q: GetAllJournalQuery) {
    const { companyId, accountId, dateRange, search } = q;
    const where: Prisma.JournalWhereInput = {};
    where.companyId = companyId;
    if (accountId) {
      where.JournalDetail = {
        some: {
          accountId,
        },
      };
    }

    if (dateRange) {
      const { from, to } = dateRange;
      where.date = {
        gte: DateTime.fromISO(from).setZone(TIMEZONE).startOf("day").toJSDate(),
        lte: DateTime.fromISO(to).setZone(TIMEZONE).endOf("day").toJSDate(),
      };
    }
    if (search) {
      where.OR = [
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          ref: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }
    return this._db.journal.paginate({
      where,
      orderBy: { date: "desc" },
      include: { JournalDetail: { include: { account: true } } },
    });
  }
  async get(q: PaginatedJournalQuery) {
    const { page, limit } = q;
    const query = await this._getQuery(q);
    const [data, meta] = await query.withPages({ page, limit });
    return { data, meta };
  }

  async getInfinite(q: CursorJournalQuery) {
    const { cursor, limit } = q;
    const query = await this._getQuery(q);
    const [data, meta] = await query.withCursor({ after: cursor, limit });
    return { data, meta };
  }
}

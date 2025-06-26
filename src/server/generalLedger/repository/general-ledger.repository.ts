/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TIMEZONE } from "@/constant";
import {
  type CursoredGeneralLedgerQuery,
  type GeneralLedgerPayload,
  type GetGeneralLedgerQuery,
  type PaginatedGeneralLedgerQuery,
} from "@/model/general-ledger.model";
import { type Prisma } from "@prisma/client";
import { DateTime } from "luxon";

import { BaseRepository } from "@/server/common";

export class GeneralLedgerRepository extends BaseRepository {
  async create(payload: GeneralLedgerPayload & { runningBalance: number }) {
    try {
      const { amount, ...others } = payload;
      const data = await this._db.generalLedger.create({
        data: {
          ...others,
        },
      });
      return data;
    } catch (error) {
      throw this._fail(error);
    }
  }

  async findLatestData(accountId: string) {
    try {
      const data = await this._db.generalLedger.findFirst({
        where: {
          accountId,
        },
        select: { runningBalance: true },
        orderBy: {
          createdAt: "desc",
        },
      });
      return data;
    } catch (error) {
      throw this._fail(error);
    }
  }

  private async _getQuery(q: GetGeneralLedgerQuery) {
    try {
      const { companyId, accountId, dateRange, search } = q;
      const whereClause: Prisma.GeneralLedgerWhereInput = { companyId };
      if (accountId) {
        whereClause.accountId = accountId;
      } else {
        whereClause.Account = { code: "1.1.1" };
      }

      if (dateRange) {
        const { from, to } = dateRange;
        whereClause.createdAt = {
          gte: DateTime.fromISO(from)
            .setZone(TIMEZONE)
            .startOf("day")
            .toJSDate(),
          lte: DateTime.fromISO(to).setZone(TIMEZONE).endOf("day").toJSDate(),
        };
      }

      return this._db.generalLedger.paginate({
        where: whereClause,
        include: { JournalDetail: { include: { journal: true } } },
        orderBy: { createdAt: "asc" },
      });
    } catch (error) {
      throw this._fail(error);
    }
  }
  async get(q: PaginatedGeneralLedgerQuery) {
    const { limit, page } = q;
    const [data, meta] = await (
      await this._getQuery(q)
    ).withPages({ limit, page });
    return { data, meta };
  }
  async getInfinite(q: CursoredGeneralLedgerQuery) {
    const { limit, cursor } = q;
    const [data, meta] = await (
      await this._getQuery(q)
    ).withCursor({ limit, after: cursor });
    return { data, meta };
  }
}

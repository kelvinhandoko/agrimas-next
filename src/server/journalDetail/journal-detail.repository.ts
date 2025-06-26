import { TIMEZONE } from "@/constant";
import {
  type GetAllJournalDetailQuery,
  type JournalDetailPayload,
} from "@/model/journal-detail.model";
import { type Prisma } from "@prisma/client";
import { DateTime } from "luxon";

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

  async getAllByAccountId(query: GetAllJournalDetailQuery) {
    const { companyId, accountId, from, to } = query;
    const whereClause: Prisma.JournalDetailWhereInput = {
      journal: {
        companyId,
      },
    };

    if (from && to) {
      const startDay = DateTime.fromISO(from, { zone: TIMEZONE })
        .startOf("day")
        .toJSDate();
      const endDay = DateTime.fromISO(to, { zone: TIMEZONE })
        .endOf("day")
        .toJSDate();
      whereClause.journal!.date = {
        gte: startDay,
        lte: endDay,
      };
    }

    if (accountId) {
      whereClause.accountId = accountId;
    } else {
      const firstAccount = await this._db.account.findFirst();
      whereClause.accountId = firstAccount?.id;
    }

    const totalPromise = this._db.journalDetail.count({ where: whereClause });
    const dataPromise = this._db.journalDetail.findMany({
      where: whereClause,
    });

    const [total, data] = await Promise.all([totalPromise, dataPromise]);

    return {
      data,
      meta: {
        totalData: total,
      },
    };
  }
}

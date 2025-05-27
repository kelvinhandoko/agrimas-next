import { TIMEZONE } from "@/constant";
import {
  type CursoredReceiveItemQuery,
  type GetAllReceiveItemQuery,
  type PaginatedReceiveItemQuery,
  type ReceiveItemPayload,
} from "@/model/recieve-item.model";
import { type Prisma } from "@prisma/client";
import { DateTime } from "luxon";

import { BaseRepository } from "@/server/common";

export class ReceiveItemRepository extends BaseRepository {
  async create(payload: Omit<ReceiveItemPayload, "details">) {
    const { companyId, purchaseId, receiveDate, note, ref } = payload;
    return await this._db.receiveItem.create({
      data: {
        companyId,
        receiveDate,
        note,
        ref: ref?.length
          ? ref
          : await this._createRef(companyId, "purchase_receive", "sj"),
        purchaseId,
      },
    });
  }

  async update(payload: ReceiveItemPayload) {
    const { id, purchaseId, receiveDate, note } = payload;
    return await this._db.receiveItem.update({
      where: {
        id,
      },
      data: {
        purchaseId,
        receiveDate,
        note,
      },
    });
  }

  private async _getQuery(q: GetAllReceiveItemQuery) {
    const { companyId, dateRange, search } = q;
    const whereClause: Prisma.ReceiveItemWhereInput = {};
    if (search) {
      whereClause.OR = [
        {
          ref: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          note: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }
    if (dateRange) {
      const { from, to } = dateRange;
      whereClause.receiveDate = {
        gte: DateTime.fromISO(from).setZone(TIMEZONE).startOf("day").toJSDate(),
        lte: DateTime.fromISO(to).setZone(TIMEZONE).endOf("day").toJSDate(),
      };
    }
    whereClause.companyId = companyId;
    return this._db.receiveItem.paginate({
      where: whereClause,
      include: {
        purchase: { include: { supplier: true } },
        receiveItemDetail: true,
      },
      orderBy: { receiveDate: "desc" },
    });
  }

  async get(q: PaginatedReceiveItemQuery) {
    const [data, meta] = await (
      await this._getQuery(q)
    ).withPages({
      limit: q.limit,
      page: q.page,
    });
    return { data, meta };
  }

  async getInfinite(q: CursoredReceiveItemQuery) {
    const [data, meta] = await (
      await this._getQuery(q)
    ).withCursor({
      limit: q.limit,
      after: q.cursor,
    });
    return { data, meta };
  }
}

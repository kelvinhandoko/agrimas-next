import { TIMEZONE } from "@/constant";
import {
  GetPurchaseReturnQuery,
  PaginatedPurchaseReturnQuery,
  type PurchaseReturnPayload,
} from "@/model/purchase-return.model";
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";

import { BaseRepository } from "@/server/common";

export class PurchaseReturnRepository extends BaseRepository {
  async create(payload: PurchaseReturnPayload) {
    const { detail, ...others } = payload;
    const totalReturn = detail.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    return this._db.purchaseReturn.create({
      data: {
        ...others,
        totalReturn,
        ref:
          payload.ref ??
          (await this._createRef(payload.companyId, "purchase_return", "PR"))
            .ref,
      },
    });
  }

  private _getQuery(q: GetPurchaseReturnQuery) {
    const { companyId, dateRange, search, supplierId } = q;
    const whereClause: Prisma.PurchaseReturnWhereInput = { companyId };
    if (dateRange) {
      const { from, to } = dateRange;
      whereClause.date = {
        gte: DateTime.fromISO(from).setZone(TIMEZONE).startOf("day").toJSDate(),
        lte: DateTime.fromISO(to).setZone(TIMEZONE).endOf("day").toJSDate(),
      };
    }
    if (supplierId) {
      whereClause.supplierId = supplierId;
    }
    return this._db.purchaseReturn.paginate({
      where: whereClause,
      include: {
        supplier: true,
        PurchaseReturnDetail: { select: { quantity: true } },
      },
      orderBy: { date: "desc" },
    });
  }

  async get(q: PaginatedPurchaseReturnQuery) {
    const { page, limit } = q;
    const [data, meta] = await this._getQuery(q).withPages({ limit, page });
    return { data, meta };
  }
}

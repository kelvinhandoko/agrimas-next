import { TIMEZONE } from "@/constant";
import {
  type GetSalesPaymentInfiniteQuery,
  type GetSalesPaymentQuery,
  type PaginatedSalesPayment,
  type SalesPaymentPayload,
} from "@/model/sales-payment.model";
import { type Prisma } from "@prisma/client";
import { DateTime } from "luxon";

import { BaseRepository } from "@/server/common";

export class SalesPaymentRepository extends BaseRepository {
  private async _getQuery(q: GetSalesPaymentQuery) {
    const { salesInvoiceId, dateRange } = q;
    const whereClause: Prisma.SalesPaymentWhereInput = {};

    if (dateRange) {
      const { from, to } = dateRange;
      whereClause.date = {
        gte: DateTime.fromISO(from).setZone(TIMEZONE).startOf("day").toJSDate(),
        lte: DateTime.fromISO(to).setZone(TIMEZONE).endOf("day").toJSDate(),
      };
    }

    whereClause.salesInvoiceId = salesInvoiceId;
    const query = this._db.salesPayment.paginate({
      where: whereClause,
      include: {
        paymentMethod: true,
        salesInvoice: true,
      },
      orderBy: { date: "desc" },
    });
    return query;
  }

  async get(q: PaginatedSalesPayment) {
    const { limit, page, ...others } = q;
    const [data, meta] = await (
      await this._getQuery(others)
    ).withPages({ limit, page });
    return { data, meta };
  }

  async getInfinite(q: GetSalesPaymentInfiniteQuery) {
    const { limit, cursor, ...others } = q;
    const [data, meta] = await (
      await this._getQuery(others)
    ).withCursor({ limit, after: cursor });
    return { data, meta };
  }

  async getDetail(id: string) {
    return await this._db.salesPayment.findFirst({
      where: { id },
      include: { salesInvoice: true, paymentMethod: true },
    });
  }

  async create(payload: SalesPaymentPayload) {
    return await this._db.salesPayment.create({ data: payload });
  }

  async update(payload: SalesPaymentPayload) {
    return await this._db.salesPayment.update({
      data: payload,
      where: { id: payload.id },
    });
  }
}

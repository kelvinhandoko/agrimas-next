import { TIMEZONE } from "@/constant";
import {
  type GetInvoiceReturnQuery,
  type InvoiceReturnPayload,
  type PaginatedInvoiceReturnQuery,
} from "@/model/invoice-return.model";
import { type Prisma } from "@prisma/client";
import { DateTime } from "luxon";

import { BaseRepository } from "@/server/common";

export class InvoiceReturnRepository extends BaseRepository {
  async create(payload: InvoiceReturnPayload) {
    try {
      const { detail, ...rest } = payload;
      const totalReturn = detail.reduce(
        (acc, curr) => acc + curr.quantity * curr.price,
        0,
      );
      return await this._db.invoiceReturn.create({
        data: {
          ...rest,
          totalReturn,
          ref:
            rest.ref ??
            (await this._createRef(rest.companyId, "INVOICE_RETURN", "IR")).ref,
        },
      });
    } catch (error) {
      throw this._fail(error);
    }
  }

  private async _getQuery(q: GetInvoiceReturnQuery) {
    const { companyId, customerId, dateRange, search } = q;
    const whereClause: Prisma.InvoiceReturnWhereInput = { companyId };
    if (customerId) {
      whereClause.customerId = customerId;
    }

    if (dateRange) {
      const { from, to } = dateRange;
      whereClause.date = {
        gte: DateTime.fromISO(from).setZone(TIMEZONE).startOf("day").toJSDate(),
        lte: DateTime.fromISO(to).setZone(TIMEZONE).endOf("day").toJSDate(),
      };
    }

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
    return this._db.invoiceReturn.paginate({
      where: whereClause,
      orderBy: { date: "desc" },
      include: { customer: true, InvoiceReturnDetail: true },
    });
  }

  async get(q: PaginatedInvoiceReturnQuery) {
    try {
      const { limit, page } = q;
      const [data, meta] = await (
        await this._getQuery(q)
      ).withPages({
        limit,
        page,
      });
      return { data, meta };
    } catch (error) {
      throw this._fail(error);
    }
  }
}

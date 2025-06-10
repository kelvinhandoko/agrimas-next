import { TIMEZONE } from "@/constant";
import {
  type CursoredPurchasePaymentQuery,
  type GetPurchasePaymentQuery,
  type PaginatedPurchasePaymentQuery,
  type PurchasePaymentPayload,
} from "@/model/purchase-payment.model";
import { type Prisma } from "@prisma/client";
import { DateTime } from "luxon";

import { BaseRepository } from "@/server/common";

export class PurchasePaymentRepository extends BaseRepository {
  async create(payload: PurchasePaymentPayload) {
    return await this._db.purchasePayment.create({
      data: payload,
    });
  }

  private async _getQuery(q: GetPurchasePaymentQuery) {
    const { companyId, dateRange, paymentMethodId, purchaseInvoiceId, search } =
      q;

    const whereClause: Prisma.PurchasePaymentWhereInput = {
      companyId,
    };

    if (paymentMethodId) {
      whereClause.paymentMethodId = paymentMethodId;
    }

    if (purchaseInvoiceId) {
      whereClause.purchaseInvoiceId = purchaseInvoiceId;
    }

    if (dateRange) {
      const { from, to } = dateRange;
      whereClause.paymentDate = {
        gte: DateTime.fromISO(from).setZone(TIMEZONE).startOf("day").toJSDate(),
        lte: DateTime.fromISO(to).setZone(TIMEZONE).endOf("day").toJSDate(),
      };
    }

    if (search) {
      whereClause.OR = [
        {
          note: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          paymentMethod: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }
    return this._db.purchasePayment.paginate({
      where: whereClause,
      include: { paymentMethod: true },
      orderBy: { paymentDate: "desc" },
    });
  }
  async get(q: PaginatedPurchasePaymentQuery) {
    const { limit, page } = q;
    const [data, meta] = await (
      await this._getQuery(q)
    ).withPages({ limit, page });
    return { data, meta };
  }

  async getInfinite(q: CursoredPurchasePaymentQuery) {
    const { limit, cursor } = q;
    const [data, meta] = await (
      await this._getQuery(q)
    ).withCursor({ limit, after: cursor });
    return { data, meta };
  }
}

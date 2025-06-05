import {
  type GetDetailPaymentMethodQuery,
  type PaymentMethodPayload,
} from "@/model/payment-method.model";
import { type Prisma } from "@prisma/client";

import {
  BaseRepository,
  type CursorQuery,
  type GetQuery,
  type PaginatedQuery,
} from "@/server/common";

export class PaymentMethodRepository extends BaseRepository {
  async create(payload: PaymentMethodPayload) {
    return await this._db.paymentMethod.create({ data: payload });
  }

  async update(payload: PaymentMethodPayload) {
    return await this._db.paymentMethod.update({
      data: payload,
      where: { id: payload.id },
    });
  }

  private async _getQuery(q: GetQuery) {
    const { companyId, search } = q;
    const whereClause: Prisma.PaymentMethodWhereInput = {};
    whereClause.companyId = companyId;
    if (search) {
      whereClause.name = {
        contains: search,
        mode: "insensitive",
      };
    }
    return this._db.paymentMethod.paginate({
      where: whereClause,
      orderBy: { name: "asc" },
    });
  }

  async get(q: PaginatedQuery) {
    const { limit, page } = q;
    const [data, meta] = await (
      await this._getQuery(q)
    ).withPages({ limit, page });
    return { data, meta };
  }

  async getInfinite(q: CursorQuery) {
    const { limit, cursor } = q;
    const [data, meta] = await (
      await this._getQuery(q)
    ).withCursor({ limit, after: cursor });
    return { data, meta };
  }

  async getDetail(q: GetDetailPaymentMethodQuery) {
    const { identifier, type } = q;
    let whereClause: Prisma.PaymentMethodWhereInput = {};
    if (type === "id" && typeof identifier === "string") {
      whereClause = { id: identifier };
    }

    if (type === "name_accountNumber" && typeof identifier === "object") {
      whereClause = {
        AND: [
          {
            accountNumber: identifier.accountNumber,
          },
          {
            name: identifier.name,
          },
        ],
      };
    }

    return await this._db.paymentMethod.findFirst({
      where: whereClause,
    });
  }
}

import {
  type CursoredSoldProductQuery,
  type FindDetailSoldProductQuery,
  type GetSoldProductQuery,
  type PaginatedSoldProductQuery,
  type SoldProductPayload,
  type UpdateSoldProductPayload,
} from "@/model/sold-product.model";
import { type Prisma } from "@prisma/client";

import { BaseRepository } from "@/server/common";

export class SoldProductRepository extends BaseRepository {
  async find(q: FindDetailSoldProductQuery) {
    const { type, identifier } = q;
    const whereClause: Prisma.SoldProductWhereInput = {};
    if (type === "id") {
      whereClause.id = identifier as string;
    } else if (type === "customer_product" && identifier instanceof Object) {
      whereClause.customerId = identifier.customerId;
      whereClause.productId = identifier.productId;
    }
    return await this._db.soldProduct.findFirst({
      where: whereClause,
    });
  }
  async create(payload: SoldProductPayload) {
    return await this._db.soldProduct.create({
      data: { ...payload, totalReturn: 0 },
    });
  }

  async update(payload: UpdateSoldProductPayload) {
    return await this._db.soldProduct.update({
      data: {
        ...payload,
        totalReturn: { increment: payload.return },
        totalSold: { increment: payload.quantity },
      },
      where: { id: payload.id },
    });
  }

  private async _getQuery(q: GetSoldProductQuery) {
    const { search, productId, customerId } = q;
    const whereClause: Prisma.SoldProductWhereInput = { customerId };
    if (productId) {
      whereClause.productId = productId;
    }
    if (search) {
      whereClause.OR = [
        {
          product: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          customer: {
            nama: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }
    return this._db.soldProduct.paginate({
      where: whereClause,
      orderBy: { product: { name: "asc" } },
    });
  }
  async get(q: PaginatedSoldProductQuery) {
    const { limit, page } = q;
    const [data, meta] = await (
      await this._getQuery(q)
    ).withPages({
      limit,
      page,
    });
    return { data, meta };
  }
  async getInfinite(q: CursoredSoldProductQuery) {
    const { limit, cursor } = q;
    const [data, meta] = await (
      await this._getQuery(q)
    ).withCursor({
      limit,
      after: cursor,
    });
    return { data, meta };
  }
}

import {
  type CursoredPurchasedProductQuery,
  type FindDetailPurchasedProductQuery,
  type GetPurchasedProductQuery,
  type PaginatedPurchasedProductQuery,
  type PurchasedProductPayload,
  type UpdatePurchasedProductPayload,
} from "@/model/purchased-product.model";
import { type Prisma } from "@prisma/client";

import { BaseRepository } from "@/server/common";

export class PurchasedProductRepository extends BaseRepository {
  async find(q: FindDetailPurchasedProductQuery) {
    const { type, identifier } = q;
    const whereClause: Prisma.PurchasedProductWhereInput = {};
    if (type === "id") {
      whereClause.id = identifier as string;
    } else if (type === "supplier_product" && identifier instanceof Object) {
      whereClause.supplierId = identifier.supplierId;
      whereClause.productId = identifier.productId;
    }
    return await this._db.purchasedProduct.findFirst({
      where: whereClause,
    });
  }
  async create(payload: PurchasedProductPayload) {
    return await this._db.purchasedProduct.create({
      data: { ...payload, totalReturn: 0 },
    });
  }

  async update(payload: UpdatePurchasedProductPayload) {
    return await this._db.purchasedProduct.update({
      data: {
        ...payload,
        totalReturn: { increment: payload.return },
        totalPurchase: { increment: payload.quantity },
      },
      where: { id: payload.id },
    });
  }

  private async _getQuery(q: GetPurchasedProductQuery) {
    const { search, productId, supplierId } = q;
    const whereClause: Prisma.PurchasedProductWhereInput = { supplierId };
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
          supplier: {
            nama: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }
    return this._db.purchasedProduct.paginate({
      where: whereClause,
      include: { product: true },
      orderBy: { product: { name: "asc" } },
    });
  }
  async get(q: PaginatedPurchasedProductQuery) {
    const { limit, page } = q;
    const [data, meta] = await (
      await this._getQuery(q)
    ).withPages({
      limit,
      page,
    });
    return { data, meta };
  }
  async getInfinite(q: CursoredPurchasedProductQuery) {
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

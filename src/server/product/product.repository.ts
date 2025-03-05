import {
  type GetAllProductQuery,
  type ProductPayload,
} from "@/model/product.model";
import { type Prisma } from "@prisma/client";
import "prisma";

import { BaseRepository } from "@/server/common";

export class ProductRepository extends BaseRepository {
  async create(payload: ProductPayload) {
    const { companyId, name, price, quantity, supplierId } = payload;
    return await this._db.product.create({
      data: {
        averagePrice: price,
        companyId,
        name,
        currentQuantity: quantity,
        supplierId,
      },
    });
  }

  async findAll(query: GetAllProductQuery) {
    const { companyId, limit, page, takeAll, search } = query;
    const whereClause: Prisma.ProductWhereInput = {};
    whereClause.companyId = companyId;
    if (search) {
      whereClause.name = {
        contains: search,
      };
    }
    return await this._db.product
      .paginate({
        where: whereClause,
      })
      .withPages({ limit, page });
  }
}

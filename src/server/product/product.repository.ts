import {
  type GetAllProductQuery,
  type ProductPayload,
  type UpdateProductStats,
} from "@/model/product.model";
import { type Prisma } from "@prisma/client";
import "prisma";

import { BaseRepository } from "@/server/common";

export class ProductRepository extends BaseRepository {
  _calculateAveragePrice(payload: Omit<UpdateProductStats, "productId">) {
    const {
      prevQuantity,
      currentQuantity,
      prevAveragePrice,
      currentPrice,
      prevPrice,
    } = payload;

    // Ensure valid stock quantities
    if (prevQuantity < 0 || currentQuantity < 0) {
      throw new Error("Stock quantities cannot be negative.");
    }

    // **Case 1: Stock reduced due to purchase update → Recalculate price**
    if (currentQuantity < prevQuantity) {
      const removedQuantity = prevQuantity - currentQuantity;

      const removedStockValue = removedQuantity * prevPrice;
      const remainingStockValue =
        prevQuantity * prevAveragePrice - removedStockValue;

      return remainingStockValue / currentQuantity || prevAveragePrice;
    }

    if (prevQuantity === 0) {
      return currentPrice;
    }

    const addedQuantity = currentQuantity - prevQuantity;
    return (
      (prevQuantity * prevAveragePrice + addedQuantity * currentPrice) /
      currentQuantity
    );
  }

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

  async update(payload: ProductPayload) {
    const { companyId, name, supplierId, id } = payload;
    return await this._db.product.update({
      where: { id },
      data: {
        companyId,
        name,
        supplierId,
      },
    });
  }

  async findAll(query: GetAllProductQuery) {
    const { companyId, limit, page, search } = query;
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

  async findDetail(id: string) {
    return await this._db.product.findUnique({
      where: { id },
    });
  }

  async updateStockAndAverage(payload: UpdateProductStats) {
    const {
      productId,
      prevQuantity,
      currentQuantity,
      prevAveragePrice,
      currentPrice,
      prevPrice,
    } = payload;
    const averagePrice = this._calculateAveragePrice({
      prevQuantity,
      currentQuantity,
      prevAveragePrice,
      currentPrice,
      prevPrice,
    });
    return await this._db.product.update({
      where: { id: productId },
      data: {
        averagePrice,
        currentQuantity,
      },
    });
  }
}

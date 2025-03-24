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
    const { companyId, name, price, quantity, supplierId, sellingPrice } =
      payload;
    return await this._db.product.create({
      data: {
        averagePrice: price ?? 0,
        sellingPrice,
        companyId,
        name,
        currentQuantity: quantity ?? 0,
        supplierId,
      },
    });
  }

  async update(payload: ProductPayload) {
    const { companyId, name, supplierId, id, sellingPrice } = payload;
    return await this._db.product.update({
      where: { id },
      data: {
        companyId,
        sellingPrice,
        name,
        supplierId,
      },
    });
  }

  async findAll(query: GetAllProductQuery) {
    const { companyId, limit, page, search, supplierId } = query;
    const whereClause: Prisma.ProductWhereInput = {};

    whereClause.companyId = companyId;
    if (search) {
      whereClause.name = {
        contains: search,
      };
    }

    if (supplierId) {
      whereClause.supplierId = supplierId;
    }

    return await this._db.product
      .paginate({
        where: whereClause,
        orderBy: {
          name: "asc",
        },
      })
      .withPages({ limit, page });
  }

  async findDetail(id: string) {
    return await this._db.product.findUnique({
      where: { id },
    });
  }

  async isExists(payload: {
    name: string;
    companyId: string;
    supplierId: string;
  }) {
    return await this._db.product.findFirst({
      where: {
        name: payload.name,
        companyId: payload.companyId,
        supplierId: payload.supplierId,
      },
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

import {
  type GetAllProductQuery,
  type ProductPayload,
  type UpdateProductStats,
} from "@/model/product.model";
import { type Prisma } from "@prisma/client";

// import "prisma";

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
    const {
      companyId,
      name,
      price,
      quantity,
      supplierId,
      sellingPrice,
      buyingPrice,
    } = payload;
    return await this._db.product.create({
      data: {
        averagePrice: price ?? 0,
        sellingPrice,
        buyingPrice,
        companyId,
        name,
        currentQuantity: quantity ?? 0,
        supplierId,
      },
    });
  }

  async update(payload: ProductPayload) {
    const { companyId, name, supplierId, id, sellingPrice, buyingPrice } =
      payload;
    return await this._db.product.update({
      where: { id },
      data: {
        companyId,
        buyingPrice,
        sellingPrice,
        name,
        supplierId,
      },
    });
  }

  private async _findAll(query: GetAllProductQuery) {
    const { companyId, needQuantity, search, supplierId } = query;
    const whereClause: Prisma.ProductWhereInput = {};

    whereClause.companyId = companyId;
    if (search) {
      whereClause.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          supplier: {
            nama: {
              equals: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    if (needQuantity) {
      whereClause.currentQuantity = needQuantity ? { gt: 0 } : undefined;
    }

    if (supplierId) {
      whereClause.supplierId = supplierId;
    }

    return this._db.product.paginate({
      where: whereClause,
      orderBy: {
        name: "asc",
      },
    });
  }

  async getPaginated(q: GetAllProductQuery) {
    const { limit, page } = q;
    const [data, meta] = await (
      await this._findAll(q)
    ).withPages({ limit, page });
    return { data, meta };
  }

  async getInfinite(q: GetAllProductQuery) {
    const { limit, cursor } = q;
    const [data, meta] = await (
      await this._findAll(q)
    ).withCursor({ limit, after: cursor });
    return { data, meta };
  }

  async findDetail(id: string) {
    return await this._db.product.findUnique({
      where: { id },
      include: { initialProduct: true, supplier: true },
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

  async decreaseStock(payload: { productId: string; quantity: number }) {
    const { productId, quantity } = payload;
    return await this._db.product.update({
      where: { id: productId },
      data: {
        currentQuantity: {
          decrement: quantity,
        },
      },
    });
  }

  async calculateCOGS(payload: Array<{ id: string; quantity: number }>) {
    const quantityMap = new Map<string, number>();
    for (const { id, quantity } of payload) {
      quantityMap.set(id, (quantityMap.get(id) ?? 0) + quantity);
    }

    const productIds = Array.from(quantityMap.keys());
    const products = await this._db.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
        averagePrice: true,
      },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    let totalCOGS = 0;

    for (const id of productIds) {
      const quantity = quantityMap.get(id)!;
      const product = productMap.get(id);

      if (!product) continue;

      const totalCost = quantity * product.averagePrice;
      totalCOGS += totalCost;
    }

    return { totalCOGS };
  }
}

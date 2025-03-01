import { type ProductPayload } from "@/model/product.model";

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
}

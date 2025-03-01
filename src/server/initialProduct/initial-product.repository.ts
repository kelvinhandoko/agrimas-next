import { type InitialProductPayload } from "@/model/initial-product.model";

import { BaseRepository } from "@/server/common";

export class InitialProductRepository extends BaseRepository {
  async create(payload: InitialProductPayload) {
    const { companyId, price, quantity, productId } = payload;
    return await this._db.initialProduct.create({
      data: {
        price,
        companyId,
        quantity,
        productId,
      },
    });
  }
}

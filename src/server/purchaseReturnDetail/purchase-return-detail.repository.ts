import { type PurchaseReturnDetailPayload } from "@/model/purchase-return-detail.model";

import { BaseRepository } from "@/server/common";

export class PurchaseReturnDetailRepository extends BaseRepository {
  async create(payload: PurchaseReturnDetailPayload) {
    return await this._db.purchaseReturnDetail.create({ data: payload });
  }

  async getTotal(supplierId: string, productId: string) {
    try {
      const {
        _sum: { quantity },
      } = await this._db.purchaseReturnDetail.aggregate({
        _sum: { quantity: true },
        where: { productId, purchaseReturn: { supplierId } },
      });
      return quantity ?? 0;
    } catch (error) {
      throw this._fail(error);
    }
  }
}

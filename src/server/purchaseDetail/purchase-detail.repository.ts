import { PPN } from "@/constant";
import { type PurchaseDetailPayload } from "@/model/purchase-detail.model";

import { BaseRepository } from "@/server/common";

export class PurchaseDetailRepository extends BaseRepository {
  async create(payload: PurchaseDetailPayload) {
    const { purchaseId, productId, quantity, price } = payload;
    const totalBefore = price * quantity;
    const netTotal = totalBefore - (totalBefore * PPN) / 100;
    return await this._db.purchaseDetail.create({
      data: {
        purchaseId,
        productId,
        quantity,
        price,
        totalBeforeDiscount: totalBefore,
        netTotal,
        discount: 0,
      },
    });
  }
}

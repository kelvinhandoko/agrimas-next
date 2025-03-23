import { PPN } from "@/constant";
import { type PurchaseDetailPayload } from "@/model/purchase-detail.model";

import { BaseRepository } from "@/server/common";

export class PurchaseDetailRepository extends BaseRepository {
  async create(payload: PurchaseDetailPayload) {
    const { purchaseId, productId, quantity, price, ppn } = payload;
    const totalBefore = price * quantity;
    const totalTax = ppn ?? 0;
    const netTotal = totalBefore - (totalBefore * PPN) / 100;
    return await this._db.purchaseDetail.create({
      data: {
        purchaseId,
        productId,
        quantity,
        price,
        totalBeforeDiscount: totalBefore,
        ppn: totalTax,
        netTotal,
        discount: 0,
      },
    });
  }
}

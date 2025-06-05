import { type PurchaseDetailPayload } from "@/model/purchase-detail.model";
import { discountHandler } from "@/utils/discountHandler";

import { BaseRepository } from "@/server/common";

export class PurchaseDetailRepository extends BaseRepository {
  async create(payload: PurchaseDetailPayload) {
    const { purchaseId, productId, quantity, price, ppn, discount } = payload;
    const totalBefore = discountHandler(price, discount ?? 0) * quantity;
    const ppnPercent = (ppn ?? 0) / 100;
    const ppnAmount = totalBefore * ppnPercent;
    const netTotal = totalBefore + ppnAmount;
    return await this._db.purchaseDetail.create({
      data: {
        purchaseId,
        productId,
        quantity,
        price,
        totalReceive: 0,
        totalBeforeDiscount: totalBefore,
        ppn: ppn ?? 0,
        netTotal,
        discount: discount ?? 0,
      },
    });
  }

  async findPurchaseProduct(payload: {
    purchaseId: string;
    productId: string;
  }) {
    const { purchaseId, productId } = payload;
    return await this._db.purchaseDetail.findFirst({
      where: {
        purchaseId,
        productId,
      },
    });
  }

  async updateTotalReceive(payload: {
    purchaseDetailId: string;
    totalReceive: number;
  }) {
    const { purchaseDetailId, totalReceive } = payload;
    return await this._db.purchaseDetail.update({
      where: {
        id: purchaseDetailId,
      },
      data: {
        totalReceive: totalReceive,
      },
    });
  }
}

import { type PurchaseDetailPayload } from "@/model/purchase-detail.model";

import { BaseRepository } from "@/server/common";

export class PurchaseDetailRepository extends BaseRepository {
  async create(payload: PurchaseDetailPayload) {
    const { purchaseId, productId, quantity, price, ppn } = payload;
    const totalBefore = price * quantity;
    const netTotal = totalBefore + (ppn ?? 0);
    return await this._db.purchaseDetail.create({
      data: {
        purchaseId,
        productId,
        quantity,
        price,
        totalBeforeDiscount: totalBefore,
        ppn: ppn ?? 0,
        netTotal,
        discount: 0,
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

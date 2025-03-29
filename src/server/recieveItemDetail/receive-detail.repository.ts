import { type ReceiveItemDetailPayload } from "@/model/receive-item-detail.model";

import { BaseRepository } from "@/server/common";

export class ReceiveItemDetailRepository extends BaseRepository {
  async create(payload: ReceiveItemDetailPayload) {
    const { productId, quantity, receiveItemId, purchaseId } = payload;
    await this._db.receiveItemDetail.create({
      data: {
        productId,
        quantity,
        receiveId: receiveItemId,
        purchaseDetailId: payload.purchaseDetailId,
      },
    });
  }
}

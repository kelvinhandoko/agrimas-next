import { type ReceiveItemDetailPayload } from "@/model/receive-item-detail.model";

import { BaseRepository } from "@/server/common";

export class ReceiveItemDetailRepository extends BaseRepository {
  async create(payload: ReceiveItemDetailPayload) {
    const { productId, quantity, receiveItemId, note } = payload;
    await this._db.receiveItemDetail.create({
      data: {
        productId,
        note,
        quantity,
        receiveId: receiveItemId,
        purchaseDetailId: payload.purchaseDetailId,
      },
    });
  }
}

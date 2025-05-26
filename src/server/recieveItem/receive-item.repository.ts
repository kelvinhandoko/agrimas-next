import { type ReceiveItemPayload } from "@/model/recieve-item.model";

import { BaseRepository } from "@/server/common";

export class ReceiveItemRepository extends BaseRepository {
  async create(payload: Omit<ReceiveItemPayload, "details">) {
    const { companyId, purchaseId, receiveDate, note, ref } = payload;
    return await this._db.receiveItem.create({
      data: {
        companyId,
        receiveDate,
        note,
        ref: ref?.length
          ? ref
          : await this._createRef(companyId, "purchase_receive", "sj"),
        purchaseId,
      },
    });
  }

  async update(payload: ReceiveItemPayload) {
    const { id, purchaseId, receiveDate, note } = payload;
    return await this._db.receiveItem.update({
      where: {
        id,
      },
      data: {
        purchaseId,
        receiveDate,
        note,
      },
    });
  }
}

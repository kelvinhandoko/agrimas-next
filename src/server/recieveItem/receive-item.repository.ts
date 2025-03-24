import { type ReceiveItemPayload } from "@/model/recieve-item.model";

import { BaseRepository } from "@/server/common";

export class ReceiveItemRepository extends BaseRepository {
  async create(payload: Omit<ReceiveItemPayload, "details">) {
    const { companyId, purchaseId, receiveDate, note } = payload;
    return await this._db.receiveItem.create({
      data: {
        companyId,
        receiveDate,
        note,
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

import { type PurchasePaymentPayload } from "@/model/purchase-payment.model";

import { BaseRepository } from "@/server/common";

export class PurchasePaymentRepository extends BaseRepository {
  async create(payload: PurchasePaymentPayload) {
    return await this._db.purchasePayment.create({
      data: payload,
    });
  }
}

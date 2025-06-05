import {
  type GetPurchasePaymentQuery,
  type PurchasePaymentPayload,
} from "@/model/purchase-payment.model";

import { BaseRepository } from "@/server/common";

export class PurchasePaymentRepository extends BaseRepository {
  async create(payload: PurchasePaymentPayload) {
    return await this._db.purchasePayment.create({
      data: payload,
    });
  }

  private async _getQuery(q: GetPurchasePaymentQuery) {
    const { companyId, dateRange, paymentMethodId, purchaseInvoiceId, search } =
      q;
  }
}

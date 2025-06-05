import { type SalesInvoiceDetailPayload } from "@/model/sales-invoice-detail.model";

import { BaseRepository } from "@/server/common";

export class SalesInvoiceDetailRepository extends BaseRepository {
  async create(payload: SalesInvoiceDetailPayload) {
    const totalBefore = payload.price * payload.quantity;
    const totalAfter = totalBefore + payload.tax - payload.discount;
    return await this._db.salesInvoiceDetail.create({
      data: { ...payload, totalAfter, totalBefore },
    });
  }
}

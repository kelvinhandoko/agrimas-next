import {
  type PurchaseInvoicePayload,
  type UpdatedPurchaseInvoiceStatusPayload,
} from "@/model/purchase-invoice";

import { BaseRepository } from "@/server/common";

export class PurchaseInvoiceRepository extends BaseRepository {
  async create(payload: PurchaseInvoicePayload) {
    const { companyId, date, receiveItemId } = payload;
    return this._db.purchaseInvoice.create({
      data: {
        companyId,
        date,
        receiveId: receiveItemId,
      },
    });
  }

  async findDetail(query: { id: string }) {
    const { id } = query;
    return this._db.purchaseInvoice.findFirst({
      where: { id },
      include: { receiveItem: { select: { totalAmount: true } } },
    });
  }
  async updateStatus(payload: UpdatedPurchaseInvoiceStatusPayload) {
    const { id, paymentStatus } = payload;
    return await this._db.purchaseInvoice.update({
      where: { id },
      data: { paymentStatus },
    });
  }
}

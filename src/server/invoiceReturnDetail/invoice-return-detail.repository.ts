import { type InvoiceReturnDetailPayload } from "@/model/invoice-return-detail.model";

import { BaseRepository } from "@/server/common";

export class InvoiceReturnDetailRepository extends BaseRepository {
  async create(payload: InvoiceReturnDetailPayload) {
    return await this._db.invoiceReturnDetail.create({ data: payload });
  }
}

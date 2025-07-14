import { type PurchaseReturnPayload } from "@/model/purchase-return.model";

import { BaseRepository } from "@/server/common";

export class PurchaseReturnRepository extends BaseRepository {
  async create(payload: PurchaseReturnPayload) {
    const { detail, ...others } = payload;
    const totalReturn = detail.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    return this._db.purchaseReturn.create({
      data: {
        ...others,
        totalReturn,

        ref:
          payload.ref ??
          (await this._createRef(payload.companyId, "purchase_return", "PR"))
            .ref,
      },
    });
  }
}

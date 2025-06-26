/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type GeneralLedgerPayload } from "@/model/general-ledger.model";

import { BaseRepository } from "@/server/common";

export class GeneralLedgerRepository extends BaseRepository {
  async create(payload: GeneralLedgerPayload & { runningBalance: number }) {
    try {
      const { amount, ...others } = payload;
      const data = await this._db.generalLedger.create({
        data: {
          ...others,
        },
      });
      return data;
    } catch (error) {
      throw this._fail(error);
    }
  }

  async findLatestData(accountId: string) {
    try {
      const data = await this._db.generalLedger.findFirst({
        where: {
          accountId,
        },
        select: { runningBalance: true },
        orderBy: {
          createdAt: "desc",
        },
      });
      return data;
    } catch (error) {
      throw this._fail(error);
    }
  }
}

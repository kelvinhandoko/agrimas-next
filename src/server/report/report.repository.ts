import { type ReportPayload } from "@/model/report.model";

import { BaseRepository } from "@/server/common";

export class ReportRepository extends BaseRepository {
  async create(payload: ReportPayload) {
    return this._db.report_Account.create({
      data: payload,
    });
  }

  async createMany(payload: Array<ReportPayload>) {
    return this._db.report_Account.createMany({
      data: payload,
    });
  }

  async getAllByAccount(accountId: string) {
    return this._db.report_Account.findMany({
      where: {
        accountId,
      },
    });
  }

  async delete(id: string) {
    return this._db.report_Account.delete({ where: { id } });
  }
}

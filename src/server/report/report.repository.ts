import { type ReportPayload } from "@/model/report.model";
import { type Prisma, type PrismaClient } from "@prisma/client";

export class ReportRepository {
  constructor(private _db: PrismaClient | Prisma.TransactionClient) {}

  async create(payload: ReportPayload) {
    return this._db.report_Account.create({
      data: payload,
    });
  }

  async createMany(payload: ReportPayload) {
    return this._db.report_Account.create({
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

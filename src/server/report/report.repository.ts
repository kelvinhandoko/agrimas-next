import { type ReportPayload } from "@/server/report/report.model";
import { type Prisma, type PrismaClient } from "@prisma/client";

export class ReportRepository {
  constructor(private _db: PrismaClient | Prisma.TransactionClient) {}

  async create(payload: ReportPayload) {
    return this._db.report_Account.create({ data: payload });
  }
}

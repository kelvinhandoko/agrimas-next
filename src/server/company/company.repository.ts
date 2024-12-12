import { type CompanyPayload } from "@/model/company.model";
import { type Prisma, type PrismaClient } from "@prisma/client";

export class CompanyRepository {
  constructor(private _db: PrismaClient | Prisma.TransactionClient) {}

  async findCompanyByName(name: string) {
    const data = await this._db.company.findUnique({ where: { name } });
    return data;
  }

  async findCompanyById(id: string) {
    const data = await this._db.company.findUnique({ where: { id } });
    return data;
  }

  async create(payload: CompanyPayload) {
    return this._db.company.create({ data: payload });
  }
}

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

  async getUserCompanies(userId: string) {
    const data = await this._db.user_Company.findMany({
      where: { userId },
      include: { company: true },
    });
    return data;
  }
  async create(payload: CompanyPayload) {
    const data = await this._db.company.create({
      data: { name: payload.name, address: payload.address },
    });

    await this._db.user_Company.create({
      data: { companyId: data.id, userId: payload.userId },
    });

    return data;
  }
}

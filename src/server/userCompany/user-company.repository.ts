import { type UserCompanyPayload } from "@/model/user-company.model";

import { BaseRepository } from "@/server/common";

export class UserCompanyRepository extends BaseRepository {
  async create(payload: UserCompanyPayload) {
    return await this._db.user_Company.create({
      data: { companyId: payload.companyId, userId: payload.userId },
    });
  }
  async delete(id: string) {
    return await this._db.user_Company.delete({
      where: { id },
    });
  }

  async findDetail(id: string) {
    return await this._db.user_Company.findUnique({
      where: { id },
    });
  }
}

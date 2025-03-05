import {
  type FindSalesByNameQuery,
  type SalesPayload,
} from "@/model/sales.model";

import { BaseRepository } from "@/server/common";

export class SalesRepository extends BaseRepository {
  async create(payload: SalesPayload) {
    ``;
    return await this._db.sales.create({ data: payload });
  }
  async update(payload: SalesPayload) {
    return await this._db.sales.update({
      where: { id: payload.id },
      data: payload,
    });
  }

  async findAll() {
    return await this._db.sales.paginate().withPages();
  }

  async findById(id: string) {
    return await this._db.sales.findUnique({ where: { id } });
  }

  async findByName(query: FindSalesByNameQuery) {
    return await this._db.sales.findUnique({
      where: {
        name_companyId: { name: query.name, companyId: query.companyId },
      },
    });
  }

  async delete(id: string) {
    return await this._db.sales.delete({ where: { id } });
  }
}

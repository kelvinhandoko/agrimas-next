import {
  type FindSalesPersonDetailQuery,
  type SalesPersonPayload,
} from "@/model/salesPerson.model";

import { BaseRepository, type PaginatedQuery } from "@/server/common";

export class SalesPersonRepository extends BaseRepository {
  async create(payload: SalesPersonPayload) {
    return await this._db.salesPerson.create({ data: payload });
  }
  async update(payload: SalesPersonPayload) {
    return await this._db.salesPerson.update({
      where: { id: payload.id },
      data: payload,
    });
  }

  async findAll(q: PaginatedQuery) {
    const { companyId, limit, page } = q;

    const [data, meta] = await this._db.salesPerson
      .paginate({
        where: { companyId },
        orderBy: { name: "asc" },
      })
      .withPages({ limit, page });
    return { data, meta };
  }

  async findDetail(q: FindSalesPersonDetailQuery) {
    const { identifier, by, companyId } = q;
    return await this._db.salesPerson.findFirst({
      where: {
        [by]: identifier,
        companyId,
      },
    });
  }

  async delete(id: string) {
    return await this._db.salesPerson.delete({ where: { id } });
  }
}

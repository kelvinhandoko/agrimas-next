/* eslint-disable @typescript-eslint/await-thenable */
import {
  type FindSalesPersonDetailQuery,
  type SalesPersonPayload,
} from "@/model/salesPerson.model";
import { type Prisma } from "@prisma/client";

import {
  BaseRepository,
  type CursorQuery,
  type GetQuery,
  type PaginatedQuery,
} from "@/server/common";

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

  private async _findAll(q: GetQuery) {
    const { companyId, search } = q;
    const whereClause: Prisma.SalesPersonWhereInput = {};
    if (search) {
      whereClause.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    whereClause.companyId = companyId;

    const query = this._db.salesPerson.paginate({
      where: whereClause,
      orderBy: { name: "asc" },
    });
    return query;
  }

  async findAllPaginated(q: PaginatedQuery) {
    const { companyId, limit, page, search } = q;
    const [data, meta] = await (
      await this._findAll({ companyId, search })
    ).withPages({ limit, page });

    return { data, meta };
  }

  async getInfinite(q: CursorQuery) {
    const { companyId, limit, cursor, search } = q;
    const [data, meta] = await (
      await this._findAll({ companyId, search })
    ).withCursor({ limit, after: cursor });

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

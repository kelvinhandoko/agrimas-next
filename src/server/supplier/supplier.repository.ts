import {
  type GetAllSupplierQuery,
  type GetDetailSupplierByIdQuery,
  type GetUniqueSupplierQuery,
  type SupplierPayload,
} from "@/model/supplier.model";
import { type Prisma } from "@prisma/client";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class SupplierRepository extends BaseRepository {
  async create(payload: SupplierPayload) {
    return await this._db.supplier.create({
      data: payload,
    });
  }

  async update(payload: Required<SupplierPayload>) {
    return await this._db.supplier.update({
      where: { id: payload.id },
      data: payload,
    });
  }

  async delete(id: string) {
    return await this._db.supplier.delete({
      where: { id },
    });
  }

  async getAll<S extends Prisma.GroupAccountInclude>(
    query: GetAllSupplierQuery<S>,
  ) {
    const {
      infiniteScroll,
      limit,
      page,
      cursor,
      takeAll,
      search,
      companyId,
      include,
    } = query;
    const whereClause: Prisma.SupplierWhereInput = {};

    let cursorClause = undefined;

    whereClause.companyId = companyId;

    // state skip clause klo tidak infinite scroll
    let skipClause: number | undefined = (page - 1) * limit;

    let take = limit;

    if (infiniteScroll) {
      if (cursor) {
        cursorClause = { id: cursor };
      }
      take = limit + 1;
      skipClause = undefined;
    }
    if (search) {
      const splitSearch = search.split(" ");
      const formatedSearch = splitSearch.join(" & ");
      whereClause.OR = [
        {
          nama: { contains: search },
        },
      ];
    }

    const total = await this._db.supplier.count({ where: whereClause });
    const data = await this._db.supplier.findMany({
      where: whereClause,
      take: take,
      cursor: cursorClause,
      skip: skipClause,
      include: include ?? (undefined as unknown as S),
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (!takeAll && data.length > limit) {
      const nextItem = data.pop();
      nextCursor = nextItem?.id;
    }
    return {
      data,
      meta: {
        totalData: total,
      },
      nextCursor,
    };
  }

  async getDetailById<S extends Prisma.GroupAccountInclude>(
    query: GetDetailSupplierByIdQuery<S>,
  ) {
    const getData = await this._db.supplier.findUnique({
      where: {
        id: query.id,
      },
      include: query.include,
    });

    return getData;
  }

  async getUniqueData(query: GetUniqueSupplierQuery) {
    const getData = await this._db.supplier.findUnique({
      where: {
        nama_companyId: {
          nama: query.nama,
          companyId: query.companyId,
        },
      },
    });

    return getData;
  }
}

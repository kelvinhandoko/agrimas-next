import {
  type CustomerPayload,
  type GetAllcustomerQuery,
} from "@/model/customer.model";
import { type GetUniqueSupplierQuery } from "@/model/supplier.model";
import { type Prisma } from "@prisma/client";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class CustomerRepository extends BaseRepository {
  async create(payload: CustomerPayload) {
    return await this._db.customer.create({
      data: payload,
    });
  }

  async update(payload: Required<CustomerPayload>) {
    return await this._db.customer.update({
      where: { id: payload.id },
      data: payload,
    });
  }

  async delete(id: string) {
    return await this._db.customer.delete({
      where: { id },
    });
  }

  async getAll(query: GetAllcustomerQuery) {
    const { infiniteScroll, limit, page, cursor, takeAll, search, companyId } =
      query;
    const whereClause: Prisma.CustomerWhereInput = {};

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
      whereClause.OR = [
        {
          nama: { contains: search },
        },
      ];
    }

    const totalPromise = this._db.customer.count({ where: whereClause });
    const dataPromise = this._db.customer.findMany({
      where: whereClause,
      take: take,
      cursor: cursorClause,
      skip: skipClause,
    });

    const [total, data] = await Promise.all([totalPromise, dataPromise]);
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

  async getDetailById(id: string) {
    const getData = await this._db.customer.findUnique({
      where: {
        id,
      },
    });

    return getData;
  }

  async getUniqueData(query: GetUniqueSupplierQuery) {
    const getData = await this._db.customer.findUnique({
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

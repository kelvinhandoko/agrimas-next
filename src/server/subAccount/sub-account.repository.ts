import {
  type GetAllSubAccountQuery,
  type GetDetailSubAccountQuery,
  type SubAccountPayload,
} from "@/model/sub-account.model";
import { type Prisma } from "@prisma/client";
import { nanoid } from "nanoid";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class SubAccountRepository extends BaseRepository {
  private _generateCode() {
    return nanoid(10);
  }

  async create(payload: SubAccountPayload) {
    const code = this._generateCode();
    return await this._db.subAccount.create({
      data: { ...payload, code },
    });
  }

  async update(payload: SubAccountPayload) {
    return await this._db.account.update({
      where: { id: payload.id },
      data: payload,
    });
  }

  async delete(id: string) {
    return await this._db.account.delete({
      where: { id },
    });
  }

  async getAll<S extends Prisma.SubAccountInclude>(
    query: GetAllSubAccountQuery<S>,
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
    const whereClause: Prisma.SubAccountWhereInput = {};

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
          code: { contains: search },
        },
      ];
    }

    const totalPromise = this._db.subAccount.count({ where: whereClause });
    const dataPromise = this._db.subAccount.findMany({
      where: whereClause,
      take: take,
      cursor: cursorClause,
      skip: skipClause,
      include: include ?? (undefined as unknown as S),
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

  async getDetail<S extends Prisma.SubAccountInclude>(
    query: GetDetailSubAccountQuery<S>,
  ) {
    const { id, include } = query;
    return await this._db.subAccount.findUnique({
      where: { id },
      include: include ?? (undefined as unknown as S),
    });
  }
}

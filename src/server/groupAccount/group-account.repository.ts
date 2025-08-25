import {
  type GetCursorGroupAccountQuery,
  type GetGroupAccountQuery,
  type GetPaginatedGroupAccountQuery,
  type GroupAccountPayload,
} from "@/model/group-account.model";
import { AccountClassOrder } from "@/utils/accountClassHelper";
import { type AccountClass, type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class GroupAccountRepository extends BaseRepository {
  private async _generateCode(accountClass: AccountClass, companyId: string) {
    return `${AccountClassOrder[accountClass]}.${(await this._createRef(companyId, accountClass, "")).seq}`;
  }

  async create(payload: GroupAccountPayload) {
    try {
      const code =
        payload.code ??
        (await this._generateCode(payload.accountClass, payload.companyId));
      return await this._db.groupAccount.create({
        data: { ...payload, code },
      });
    } catch {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "server error",
      });
    }
  }

  async update(payload: GroupAccountPayload) {
    return await this._db.groupAccount.update({
      data: payload,
      where: { id: payload.id },
    });
  }

  private _getQuery(q: GetGroupAccountQuery) {
    const { companyId, search, accountClass } = q;
    const whereClause: Prisma.GroupAccountWhereInput = {};
    if (search) {
      whereClause.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          account: {
            some: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      ];
    }

    if (accountClass) {
      whereClause.accountClass = accountClass;
    }

    whereClause.companyId = companyId;
    return this._db.groupAccount.paginate({
      where: whereClause,
      include: {
        account: true,
      },
      orderBy: { code: "asc" },
    });
  }
  async get(q: GetPaginatedGroupAccountQuery) {
    const { page, limit } = q;
    const [data, meta] = await this._getQuery(q).withPages({
      limit,
      page,
    });
    return {
      data,
      meta,
    };
  }

  async getInfinite(q: GetCursorGroupAccountQuery) {
    const { cursor, limit } = q;
    const [data, meta] = await this._getQuery(q).withCursor({
      limit,
      after: cursor,
    });
    return {
      data,
      meta,
    };
  }
}

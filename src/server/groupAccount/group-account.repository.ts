import {
  type GetAllGroupAccountQuery,
  type GroupAccountPayload,
} from "@/model/group-account.model";
import { AccountClassOrder } from "@/utils/accountClassHelper";
import { type AccountClass, type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class GroupAccountRepository extends BaseRepository {
  private async _generateCode(accountClass: AccountClass) {
    const findData = await this._db.groupAccount.findMany({
      where: { accountClass },
    });

    const currentTotal = findData.length;
    return `${AccountClassOrder[accountClass]}.${currentTotal + 1}`;
  }

  async create(payload: GroupAccountPayload) {
    try {
      const code =
        payload.code ?? (await this._generateCode(payload.accountClass));
      return await this._db.groupAccount.create({
        data: { ...payload, code, companyId: payload.companyId! },
      });
    } catch (e) {
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

  async getAll<S extends Prisma.GroupAccountInclude>(
    query: GetAllGroupAccountQuery<S>,
  ) {
    const { infiniteScroll, limit, cursor, search, companyId, include, page } =
      query;

    // Where Clause
    const whereClause: Prisma.GroupAccountWhereInput = {
      companyId,
    };

    if (search) {
      whereClause.OR = [{ code: { contains: search } }];
    }

    if (cursor && infiniteScroll) {
      const [data, meta] = await this._db.groupAccount.paginate().withCursor({
        limit,
        after: cursor || undefined,
      });
      return {
        data,
        meta,
        nextCursor: meta.endCursor,
      };
    }

    const [data, meta] = await this._db.groupAccount
      .paginate({
        where: whereClause,
        include,
      })
      .withPages({
        limit,
        page,
      });

    return {
      data,
      meta,
    };
  }
}

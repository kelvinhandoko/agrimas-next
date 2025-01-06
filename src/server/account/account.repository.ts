import {
  type AccountPayload,
  type GetAllAccountQuery,
  type GetDetailAccountQuery,
  type UpdateBalancePayload,
} from "@/model/account.model";
import { type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class AccountRepository extends BaseRepository {
  private async _generateCode(groupAccountId: string) {
    const findData = await this._db.groupAccount.findUnique({
      where: { id: groupAccountId },
      include: {
        _count: { select: { account: true } },
      },
    });

    if (!findData) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "kelompok akun tidak ditemukan",
      });
    }
    const currentTotal = findData._count.account;
    return `${findData.code}.${currentTotal + 1}`;
  }

  async create(payload: Omit<AccountPayload, "report">) {
    const code = await this._generateCode(payload.groupAccountId);
    return await this._db.account.create({
      data: { ...payload, code },
    });
  }

  async update(payload: Omit<AccountPayload, "report">) {
    return await this._db.account.update({
      where: { id: payload.id },
      data: payload,
    });
  }

  async updateBalance(payload: UpdateBalancePayload) {
    await this._db.account.update({
      where: { id: payload.id },
      data: {
        currentBalance: payload.balance,
      },
    });
  }

  async delete(id: string) {
    return await this._db.account.delete({
      where: { id },
    });
  }

  async getAll<S extends Prisma.AccountInclude | undefined>(
    query: GetAllAccountQuery<S>,
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
    const whereClause: Prisma.AccountWhereInput = {};

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
        {
          name: { contains: search },
        },
      ];
    }

    const totalPromise = this._db.account.count({ where: whereClause });
    const dataPromise = this._db.account.findMany({
      where: whereClause,
      take: take,
      cursor: cursorClause,
      skip: skipClause,
      include: include ?? (undefined as S),
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

  async getDetail<S extends Prisma.AccountInclude>(
    query: GetDetailAccountQuery<S>,
  ) {
    const { id, include } = query;
    return await this._db.account.findUnique({
      where: { id },
      include: include ?? (undefined as unknown as S),
    });
  }
}

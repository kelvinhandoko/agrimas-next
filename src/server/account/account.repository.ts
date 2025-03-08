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
    return {
      code: `${findData.code}.${currentTotal + 1}`,
      currentTotal,
      groupAccountCode: findData.code,
    };
  }

  async create(payload: Omit<AccountPayload, "report">) {
    const { code } = await this._generateCode(payload.groupAccountId);
    return await this._db.account.create({
      data: { ...payload, code },
    });
  }

  async createBatch(payload: Array<AccountPayload>) {
    const { currentTotal, groupAccountCode } = await this._generateCode(
      payload[0]!.groupAccountId,
    );
    let updatedTotal = currentTotal + 1;
    const createDataWithCode = payload.map(({ report, ...item }) => {
      const code = `${groupAccountCode}.${updatedTotal}`;
      updatedTotal++;
      return { ...item, code };
    });

    // Create accounts with unique codes for each item
    return await this._db.account.createMany({
      data: createDataWithCode,
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

  async getAll<S extends Prisma.AccountInclude>(query: GetAllAccountQuery<S>) {
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

    const [data, meta] = await this._db.account
      .paginate({
        where: whereClause,
        include: include ?? (undefined as unknown as S),
      })
      .withCursor({ after: cursor ?? undefined });

    return {
      data,
      meta,
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

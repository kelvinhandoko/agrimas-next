import { BaseRepository } from "@/server/common/repository/BaseRepository";
import {
  type GetAllGroupAccountQuery,
  type GroupAccountPayload,
} from "@/server/groupAccount/group-account.model";
import { AccountClassOrder } from "@/utils/accountClassHelper";
import { type AccountClass, type Prisma } from "@prisma/client";

export class GroupAccountRepository extends BaseRepository {
  private async _generateCode(accountClass: AccountClass) {
    const findData = await this._db.groupAccount.findMany({
      where: { accountClass },
    });

    const currentTotal = findData.length;
    return `${AccountClassOrder[accountClass]}.${currentTotal + 1}`;
  }

  async create(payload: GroupAccountPayload) {
    const code =
      payload.code ?? (await this._generateCode(payload.accountClass));
    return await this._db.groupAccount.create({
      data: { ...payload, code, companyId: payload.companyId! },
    });
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
    const whereClause: Prisma.GroupAccountWhereInput = {};

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

    const totalPromise = this._db.groupAccount.count({ where: whereClause });
    const dataPromise = this._db.groupAccount.findMany({
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
}

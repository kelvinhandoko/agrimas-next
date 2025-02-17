import { type GetAllUserQuery, type UserPayload } from "@/model/user.model";
import { type Prisma, type PrismaClient } from "@prisma/client";

import { type DbTransactionClient } from "@/server/db";

export class UserRepository {
  constructor(private _db: PrismaClient | DbTransactionClient) {}

  async findUserByUsername(username: string) {
    const data = await this._db.user.findFirst({ where: { username } });
    return data;
  }

  async findUserById(id: string) {
    const data = await this._db.user.findUnique({
      where: { id },
      include: { userCompany: true },
    });
    return data;
  }

  async create(user: UserPayload) {
    return this._db.user.create({ data: user });
  }

  async update(user: UserPayload) {
    return this._db.user.update({ data: user, where: { id: user.id } });
  }

  async findUserCompany(payload: { name: string; companyId: string }) {
    const { companyId, name } = payload;
    const data = await this._db.user_Company.findFirst({
      where: {
        user: { username: name },
        companyId,
      },
    });
    return data;
  }

  async getAll<T extends Prisma.UserInclude>(query: GetAllUserQuery<T>) {
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
    const whereClause: Prisma.UserWhereInput = {};

    let cursorClause = undefined;

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

    // if (search) {
    //   const splitSearch = search.split(" ");
    //   const formatedSearch = splitSearch.join(" & ");
    //   whereClause.OR = [
    //     {
    //       ref: { contains: search },
    //     },
    //   ];
    // }

    const total = await this._db.user.count({ where: whereClause });
    const data = await this._db.user.findMany({
      where: whereClause,
      take: take,
      cursor: cursorClause,
      skip: skipClause,
      include: include ?? (undefined as unknown as T),
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

  async delete(id: string) {
    return await this._db.user.delete({
      where: { id },
    });
  }
}

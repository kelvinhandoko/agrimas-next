import { type DefaultAccountPayload } from "@/model/default-account.model";
import { TRANSACTION_CATEGORY } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { BaseRepository } from "@/server/common";

export class DefaultAccountRepository extends BaseRepository {
  async createBulk(payload: DefaultAccountPayload[]) {
    return await this._db.defaultAccount.createMany({ data: payload });
  }
  async create(payload: DefaultAccountPayload) {
    return await this._db.defaultAccount.create({ data: payload });
  }

  async getByCompany(companyId: string) {
    const data = await this._db.defaultAccount.findMany({
      where: { companyId },
      select: { category: true, id: true },
    });

    const map = new Map<keyof typeof TRANSACTION_CATEGORY, string>();

    for (const record of data) {
      if (record.category) {
        map.set(record.category, record.id);
      }
    }

    const missing = Object.values(TRANSACTION_CATEGORY).filter(
      (category) => !map.has(category),
    );

    if (missing.length > 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Missing default account for ${missing.join(", ")}`,
      });
    }

    return map;
  }
}

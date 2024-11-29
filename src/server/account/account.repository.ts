import { type AccountPayload } from "@/server/account/account.model";
import { BaseRepository } from "@/server/common/repository/BaseRepository";
import { TRPCError } from "@trpc/server";

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
}

import {
  type AccountPayload,
  type CursoredAccountQuery,
  type GetAccountQuery,
  type GetDetailAccountQuery,
  type PaginatedAccountQuery,
  type UpdateBalancePayload,
} from "@/model/account.model";
import { type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class AccountRepository extends BaseRepository {
  // Generate single code
  private async _generateCode(groupAccountId: string) {
    const groupAccount = await this._db.groupAccount.findFirst({
      where: { id: groupAccountId },
    });

    if (!groupAccount) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Kelompok akun tidak ditemukan",
      });
    }

    const sequenceName = `group_account_seq_${groupAccountId}`;

    await this._db.$executeRawUnsafe(
      `CREATE SEQUENCE IF NOT EXISTS "${sequenceName}" START 1`,
    );

    const data = await this._db.$queryRawUnsafe<{ nextval: number }[]>(
      `SELECT nextval('${sequenceName}')`,
    );

    const nextval = data[0]?.nextval ?? 0;

    return {
      code: `${groupAccount.code}.${nextval}`,
      groupAccountCode: groupAccount.code,
    };
  }

  // Generate multiple codes
  private async _generateMultipleCodes(groupAccountId: string, amount: number) {
    const groupAccount = await this._db.groupAccount.findFirst({
      where: { id: groupAccountId },
    });

    if (!groupAccount) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Kelompok akun tidak ditemukan",
      });
    }

    const sequenceName = `group_account_seq_${groupAccountId}`;

    await this._db.$executeRawUnsafe(
      `CREATE SEQUENCE IF NOT EXISTS "${sequenceName}" START 1`,
    );

    const codes: string[] = [];

    for (let i = 0; i < amount; i++) {
      const data = await this._db.$queryRawUnsafe<{ nextval: number }[]>(
        `SELECT nextval('${sequenceName}')`,
      );
      const nextval = data[0]?.nextval ?? 0;
      codes.push(`${groupAccount.code}.${nextval}`);
    }

    return codes;
  }

  // Create single account
  async create(payload: Omit<AccountPayload, "report">) {
    const { code } = await this._generateCode(payload.groupAccountId);

    return this._db.account.create({
      data: { ...payload, code },
    });
  }

  // Create multiple accounts
  async createBatch(payload: AccountPayload[]) {
    if (payload.length === 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payload batch kosong",
      });
    }

    const groupAccountId = payload[0]!.groupAccountId;
    const codes = await this._generateMultipleCodes(
      groupAccountId,
      payload.length,
    );

    const createData = payload.map(
      ({ companyId, groupAccountId, name, posisi, reports, id }, index) => ({
        companyId,
        groupAccountId,
        name,
        reports,
        posisi,
        id,
        code: codes[index]!,
      }),
    );

    await this._db.account.createMany({
      data: createData,
    });

    return { success: true };
  }

  // Update existing account
  async update(payload: Omit<AccountPayload, "report">) {
    return this._db.account.update({
      where: { id: payload.id },
      data: payload,
    });
  }

  async updateBalance(payload: UpdateBalancePayload) {
    return this._db.account.update({
      where: { id: payload.id },
      data: {
        currentBalance: payload.balance,
      },
    });
  }

  // Delete account by ID
  async delete(id: string) {
    return this._db.account.delete({
      where: { id },
    });
  }

  private async _getQuery(query: GetAccountQuery) {
    const { companyId, search } = query;
    const whereClause: Prisma.AccountWhereInput = {};
    console.log({ search });
    if (search) {
      whereClause.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          code: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }
    whereClause.companyId = companyId;
    return this._db.account.paginate({
      where: whereClause,
      include: {
        groupAccount: true,
      },
      orderBy: [
        {
          code: "asc",
        },
        {
          createdAt: "asc",
        },
      ],
    });
  }

  async getPaginated(query: PaginatedAccountQuery) {
    const { page, limit } = query;
    const [data, meta] = await (
      await this._getQuery(query)
    ).withPages({ page, limit });
    return { data, meta };
  }

  async getCursored(query: CursoredAccountQuery) {
    const { cursor, limit } = query;
    const [data, meta] = await (
      await this._getQuery(query)
    ).withCursor({ after: cursor, limit });
    return { data, meta };
  }

  async getDetail(query: GetDetailAccountQuery) {
    const { id } = query;

    const account = await this._db.account.findFirst({
      where: { id },
    });

    if (!account) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Akun tidak ditemukan",
      });
    }

    return account;
  }
}

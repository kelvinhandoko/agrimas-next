import { TRPCError } from "@trpc/server";
import { DateTime } from "luxon";

import { type DbTransactionClient, type db } from "@/server/db";

export class BaseRepository {
  constructor(protected readonly _db: DbTransactionClient | typeof db) {}

  protected async _createRef(
    companyId: string,
    refName: string,
    refCode: string,
  ) {
    await this._db.$executeRawUnsafe(`
          DO $$
          BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = '${companyId}_${refName}') THEN
              CREATE SEQUENCE ${companyId}_${refName} START 1;
            END IF;
          END
          $$;
        `);

    const sequenceData = await this._db.$queryRawUnsafe<{ nextval: number }[]>(
      `SELECT nextval('${companyId}_${refName}')`,
    );

    const paddedSeq = String(sequenceData[0]?.nextval ?? 1).padStart(3, "0");
    const datePart = DateTime.now().toFormat("yyyyMMdd");
    return {
      ref: `${refCode}-${datePart}-${paddedSeq}`,
      seq: paddedSeq,
    };
  }

  protected _fail(err: unknown) {
    return new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Terjadi kesalahan pada server",
      cause: err,
    });
  }
}

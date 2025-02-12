import { type DbTransactionClient, type db } from "@/server/db";

export class BaseRepository {
  constructor(protected readonly _db: DbTransactionClient | typeof db) {}
}

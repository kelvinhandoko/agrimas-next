import { type DbTransactionClient, type db } from "@/server/db";

export class TransactionService {
  constructor(private _db: typeof db) {}
  startTransaction<T>(cb: (tx: DbTransactionClient) => Promise<T>): Promise<T> {
    return this._db.$transaction(cb);
  }
}

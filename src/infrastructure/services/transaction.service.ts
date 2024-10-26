import { type Prisma, type PrismaClient } from "@prisma/client";

export class TransactionService {
  constructor(private _db: PrismaClient) {}
  startTransaction<T>(
    cb: (tx: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return this._db.$transaction(cb);
  }
}

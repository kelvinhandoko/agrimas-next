import { db } from "@/infrastructure/prisma/prisma";
import { type Prisma } from "@prisma/client";

export class TransactionService {
  startTransaction<T>(
    cb: (tx: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return db.$transaction(cb);
  }
}

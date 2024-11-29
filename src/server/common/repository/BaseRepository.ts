import { type Prisma, type PrismaClient } from "@prisma/client";

export class BaseRepository {
  constructor(
    protected readonly _db: Prisma.TransactionClient | PrismaClient,
  ) {}
}

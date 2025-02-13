import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    errorFormat: "pretty",
    transactionOptions: { maxWait: 5000, timeout: 100000 },
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

export type DbTransactionClient = Parameters<
  Parameters<(typeof db)["$transaction"]>[0]
>[0];

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

import { env } from "@/env";
import { Prisma, PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";
import { createSoftDeleteExtension } from "prisma-extension-soft-delete";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    errorFormat: "pretty",
    transactionOptions: { maxWait: 5000, timeout: 100000 },
  })
    .$extends(
      pagination({
        pages: {
          limit: 10,
          includePageCount: true,
        },
        cursor: {
          limit: 10,
        },
      }),
    )
    .$extends(
      createSoftDeleteExtension({
        models: Object.fromEntries(
          Object.keys(Prisma.ModelName).map((model) => [model, true]),
        ),
        defaultConfig: {
          field: "deleted",
          createValue: (deleted) => {
            if (deleted) return new Date();
            return null;
          },
        },
      }),
    );

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

export type DbTransactionClient = Parameters<
  Parameters<(typeof db)["$transaction"]>[0]
>[0];

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { env } from "@/env";
import { appRouter } from "@/trpc/root";
import { api } from "@/trpc/server";
import { createTRPCContext } from "@/trpc/trpc";
import { type InputJsonValue } from "@prisma/client/runtime/library";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError: async ({ error, path, input, ctx }) => {
      env.NODE_ENV === "development" &&
        console.error(
          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
        );
      const ipAddress = ctx?.headers.get("x-forwarded-for") ?? "";
      await api.errorLog.create({
        input: input as InputJsonValue,
        message: error.message,
        path: path ?? "",
        ipAddress,
        stackTrace: error.stack,
        statusCode: error.code as string,
      });
    },
  });

export { handler as GET, handler as POST };

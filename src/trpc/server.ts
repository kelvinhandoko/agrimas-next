/* eslint-disable @typescript-eslint/no-misused-promises */
import { type AppRouter, createCaller } from "@/trpc/root";
import { createTRPCContext } from "@/trpc/trpc";
import { type InputJsonValue } from "@prisma/client/runtime/library";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";
import "server-only";

import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
export const createContext = cache(async () => {
  const headersList = await headers();

  const heads = new Headers(headersList);
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext, {
  onError: async ({ error, path, input, ctx }) => {
    const ipAddress = ctx?.headers.get("x-forwarded-for") ?? "";
    await api.errorLog.create({
      input: JSON.stringify(input) as InputJsonValue,
      message: error.message,
      path: path ?? "",
      ipAddress,
      stackTrace: JSON.stringify(error.stack),
      statusCode: error.code as string,
    });
  },
});

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);

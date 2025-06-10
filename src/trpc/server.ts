/* eslint-disable @typescript-eslint/no-misused-promises */
import { type AppRouter, createCaller } from "@/trpc/root";
import { createTRPCContext } from "@/trpc/trpc";
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
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);

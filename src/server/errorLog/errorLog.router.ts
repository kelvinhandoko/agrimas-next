import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createErrorLogController } from "@/server/errorLog/controller/create-errorLog.controller";

export const errorLogRouter = createTRPCRouter({
  create: createErrorLogController,
});

export type ErrorLogRouterOutputs = inferRouterOutputs<typeof errorLogRouter>;

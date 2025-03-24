import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createReceiveItemController } from "@/server/recieveItem/controller/create-receive-item.controller";

export const receiveItemRouter = createTRPCRouter({
  create: createReceiveItemController,
});

export type ReceiveItemRouter = inferRouterOutputs<typeof receiveItemRouter>;

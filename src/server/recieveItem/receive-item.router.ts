import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createReceiveItemController } from "@/server/recieveItem/controller/create-receive-item.controller";
import { getInfiniteReceiveItemController } from "@/server/recieveItem/controller/get-infinite-receive-item.controller";
import { getReceiveItemController } from "@/server/recieveItem/controller/get-receive-item.controller";

export const receiveItemRouter = createTRPCRouter({
  create: createReceiveItemController,
  get: getReceiveItemController,
  getInfinite: getInfiniteReceiveItemController,
});

export type ReceiveItemRouter = inferRouterOutputs<typeof receiveItemRouter>;

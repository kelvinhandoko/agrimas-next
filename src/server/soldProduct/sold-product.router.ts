import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { getInfiniteSoldProductController } from "@/server/soldProduct/controller/get-infinite-sold-product.controller";

export const soldProductRouter = createTRPCRouter({
  getInfinite: getInfiniteSoldProductController,
});

export type SoldProductRouter = inferRouterOutputs<typeof soldProductRouter>;

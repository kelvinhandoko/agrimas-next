import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createGroupAccountController } from "@/server/groupAccount/controller/create-group-account.controller";
import { getGroupAccountController } from "@/server/groupAccount/controller/get-group-account.controller";
import { getInfiniteGroupAccountController } from "@/server/groupAccount/controller/get-infinite-account.controller";
import { updateGroupAccountController } from "@/server/groupAccount/controller/update-group-account.controller";

export const groupAccountRouter = createTRPCRouter({
  create: createGroupAccountController,
  getAll: getGroupAccountController,
  update: updateGroupAccountController,
  getInfinite: getInfiniteGroupAccountController,
});

export type GroupAccountRouterOutputs = inferRouterOutputs<
  typeof groupAccountRouter
>;

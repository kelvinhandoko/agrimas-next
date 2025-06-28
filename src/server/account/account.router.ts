import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createAccountController } from "@/server/account/controller/create-account.controller";
import { deleteAccountController } from "@/server/account/controller/delete-account.controller";
import { getCursorAccountController } from "@/server/account/controller/get-cursor-account.controller";
import { getDetailAccountController } from "@/server/account/controller/get-detail-account.controller";
import { getPaginatedAccountController } from "@/server/account/controller/get-paginated-account.controller";
import { updateAccountController } from "@/server/account/controller/update-account.controller";

export const accountRouter = createTRPCRouter({
  get: getPaginatedAccountController,
  getInfinite: getCursorAccountController,
  getDetail: getDetailAccountController,
  delete: deleteAccountController,
  create: createAccountController,
  update: updateAccountController,
});

export type AccountRouterOutputs = inferRouterOutputs<typeof accountRouter>;

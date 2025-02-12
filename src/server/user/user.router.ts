import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createUserController } from "@/server/user/controller/create-user.controller";
import { deleteUserController } from "@/server/user/controller/delete-user.controller";
import { updateUserController } from "@/server/user/controller/update-user.controller";

export const userRouter = createTRPCRouter({
  create: createUserController,
  update: updateUserController,
  delete: deleteUserController,
});

export type UserRouterOutputs = inferRouterOutputs<typeof userRouter>;

import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import {
  createCustomerController,
  getAllCustomerController,
  getDetailCustomerController,
  updateCustomerController,
} from "@/server/customer/controller";

export const customerRouter = createTRPCRouter({
  create: createCustomerController,
  update: updateCustomerController,
  getAll: getAllCustomerController,
  getDetail: getDetailCustomerController,
});

export type CustomerRouterOutputs = inferRouterOutputs<typeof customerRouter>;

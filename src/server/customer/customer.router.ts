import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import {
  createCustomerController,
  getAllCustomerController,
  getDetailCustomerController,
  updateCustomerController,
} from "@/server/customer/controller";
import { getAllCustomerInfiniteController } from "@/server/customer/controller/get-all-customer-infinite.controller";

export const customerRouter = createTRPCRouter({
  create: createCustomerController,
  update: updateCustomerController,
  getAll: getAllCustomerController,
  getDetail: getDetailCustomerController,
  getInfinite: getAllCustomerInfiniteController,
});

export type CustomerRouterOutputs = inferRouterOutputs<typeof customerRouter>;

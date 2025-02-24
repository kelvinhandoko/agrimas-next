import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createSalesController } from "@/server/sales/controller/create-sales.controller";
import { findAllSalesController } from "@/server/sales/controller/find-all-sales.controller";
import { findDetailSalesController } from "@/server/sales/controller/find-detail-sales.controller";
import { updateSalesController } from "@/server/sales/controller/update-sales.controller";

export const salesRouter = createTRPCRouter({
  create: createSalesController,
  findAll: findAllSalesController,
  update: updateSalesController,
  findDetail: findDetailSalesController,
});

export type SalesRouterOutputs = inferRouterOutputs<typeof salesRouter>;

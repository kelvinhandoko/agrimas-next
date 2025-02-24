import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createSalesController } from "@/server/sales/controller/create-sales.use-case";
import { findAllSalesController } from "@/server/sales/controller/find-all-sales.use-case";
import { findDetailSalesController } from "@/server/sales/controller/find-detail-sales.use-case";
import { updateSalesController } from "@/server/sales/controller/update-sales.use-case";

export const salesRouter = createTRPCRouter({
  create: createSalesController,
  findAll: findAllSalesController,
  update: updateSalesController,
  findDetail: findDetailSalesController,
});

export type SalesRouterOutputs = inferRouterOutputs<typeof salesRouter>;

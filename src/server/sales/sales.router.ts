import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createSalesController } from "@/server/sales/controller/create-sales.controller";
import { deleteSalesController } from "@/server/sales/controller/delete-sales.controller";
import { findAllSalesController } from "@/server/sales/controller/find-all-sales.controller";
import { findDetailSalesController } from "@/server/sales/controller/find-detail-sales.controller";
import { updateSalesController } from "@/server/sales/controller/update-sales.controller";

export const salesRouter = createTRPCRouter({
  create: createSalesController,
  findAll: findAllSalesController,
  update: updateSalesController,
  findDetail: findDetailSalesController,
  delete: deleteSalesController,
});

export type SalesRouterOutputs = inferRouterOutputs<typeof salesRouter>;

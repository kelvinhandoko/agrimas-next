import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createSalesPersonController } from "@/server/salesPerson/controller/create-sales-person.controller";
import { deleteSalesPersonController } from "@/server/salesPerson/controller/delete-sales-person.controller";
import { findAllSalesController } from "@/server/salesPerson/controller/find-all-sales-person.controller";
import { findDetailSalesPersonController } from "@/server/salesPerson/controller/find-detail-sales-person.controller";
import { updateSalesPersonController } from "@/server/salesPerson/controller/update-sales-person.controller";

export const salesPersonRouter = createTRPCRouter({
  create: createSalesPersonController,
  findAll: findAllSalesController,
  update: updateSalesPersonController,
  findDetail: findDetailSalesPersonController,
  delete: deleteSalesPersonController,
});

export type SalesPersonRouterOutputs = inferRouterOutputs<
  typeof salesPersonRouter
>;

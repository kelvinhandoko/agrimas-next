import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createSupplierController } from "@/server/supplier/controller/create-supplier.controller";

export const supplierRouter = createTRPCRouter({
  create: createSupplierController,
});

export type SupplierRouterOutputs = inferRouterOutputs<typeof supplierRouter>;

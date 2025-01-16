import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import {
  getAllSupplierController,
  getDetailSupplierController,
  updateSupplierController,
} from "@/server/supplier/controller";
import { createSupplierController } from "@/server/supplier/controller/create-supplier.controller";

export const supplierRouter = createTRPCRouter({
  create: createSupplierController,
  update: updateSupplierController,
  getAll: getAllSupplierController,
  getDetail: getDetailSupplierController,
});

export type SupplierRouterOutputs = inferRouterOutputs<typeof supplierRouter>;

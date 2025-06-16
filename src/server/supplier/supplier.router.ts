import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import {
  getAllSupplierController,
  getDetailSupplierController,
  updateSupplierController,
} from "@/server/supplier/controller";
import { createSupplierController } from "@/server/supplier/controller/create-supplier.controller";
import { getInfiniteSupplierController } from "@/server/supplier/controller/get-infinite-supplier.controller copy";

export const supplierRouter = createTRPCRouter({
  create: createSupplierController,
  update: updateSupplierController,
  getAll: getAllSupplierController,
  getInfinite: getInfiniteSupplierController,
  getDetail: getDetailSupplierController,
});

export type SupplierRouterOutputs = inferRouterOutputs<typeof supplierRouter>;

import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createProductController } from "@/server/product/controller/create-product.controller";
import { getAllProductController } from "@/server/product/controller/get-all-product.controller";

export const productRouter = createTRPCRouter({
  create: createProductController,
  getAll: getAllProductController,
});

export type ProductRouterOutput = inferRouterOutputs<typeof productRouter>;

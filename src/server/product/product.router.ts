import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createProductController } from "@/server/product/controller/create-product.controller";
import { getAllProductController } from "@/server/product/controller/get-all-product.controller";
import { getDetailProductController } from "@/server/product/controller/get-detail-product.controller";
import { getInfiniteProductController } from "@/server/product/controller/get-product-infinite.controller";
import { updateProductController } from "@/server/product/controller/update-product.controller";

export const productRouter = createTRPCRouter({
  create: createProductController,
  getAll: getAllProductController,
  getInfinite: getInfiniteProductController,
  getDetail: getDetailProductController,
  update: updateProductController,
});

export type ProductRouterOutput = inferRouterOutputs<typeof productRouter>;

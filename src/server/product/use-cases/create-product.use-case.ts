import { type ProductPayload } from "@/model/product.model";
import { createColumnHelper } from "@tanstack/react-table";

import { type ProductRepository } from "@/server/product/product.repository";
import { type SalesRouterOutputs } from "@/server/sales/sales.router";

export const createProductUseCase =
  (productRepo: ProductRepository) => async (payload: ProductPayload) => {};

const columnHelper = createColumnHelper<SalesRouterOutputs["findAll"][0]>();

const columns = [columnHelper.accessor("")];

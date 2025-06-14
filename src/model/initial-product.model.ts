import { productPayloadSchema } from "@/model/product.model";
import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const initialProductPayloadSchema = productPayloadSchema
  .omit({ name: true, supplierId: true })
  .extend({
    productId: z.string(),
  });

export type InitialProductPayload = z.infer<
  typeof initialProductPayloadSchema
> &
  WithCompany;

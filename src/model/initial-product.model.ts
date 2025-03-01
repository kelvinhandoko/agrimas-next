import { productPayloadSchema } from "@/model/product.model";
import { type WithCompany } from "@/server";
import { z } from "zod";

export const initialProductPayloadSchema = productPayloadSchema
  .omit({ name: true, supplierId: true })
  .extend({
    productId: z.string(),
  });

export type InitialProductPayload = z.infer<
  typeof initialProductPayloadSchema
> &
  WithCompany;

import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const salesPersonPayloadSchema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: "nama harus diisi" }),
});

export type SalesPersonPayload = z.infer<typeof salesPersonPayloadSchema> &
  WithCompany;

export const findSalesPersonDetailQuerySchema = z.object({
  by: z.enum(["id", "name"]).default("id"),
  identifier: z.string(),
  companyId: z.string(),
});

export type FindSalesPersonDetailQuery = z.infer<
  typeof findSalesPersonDetailQuerySchema
>;

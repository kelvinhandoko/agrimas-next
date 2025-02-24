import { type WithCompany } from "@/server";
import { z } from "zod";

export const salesPayloadSchema = z.object({
  name: z.string().min(1, "Name required"),
  id: z.string().optional(),
});

export type SalesPayload = z.infer<typeof salesPayloadSchema> & WithCompany;

export const findSalesByNameQuerySchema = z.object({
  name: z.string().trim().min(1, "Name required"),
});

export type FindSalesByNameQuery = z.infer<typeof findSalesByNameQuerySchema> &
  WithCompany;

import { type WithCompany } from "@/server";
import { z } from "zod";

export const salesPayloadSchema = z.object({
  name: z.string().min(1, "Name required"),
});

export type SalesPayload = z.infer<typeof salesPayloadSchema> & WithCompany;

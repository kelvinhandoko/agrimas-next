import { z } from "zod";

export const userCompanyPayloadSchema = z.object({
  userId: z.string(),
  companyId: z.string(),
});

export type UserCompanyPayload = z.infer<typeof userCompanyPayloadSchema>;

import { z } from "zod";

export const companyPayloadSchema = z.object({
  name: z.string().min(1, { message: "company name is required" }),
  address: z.string().optional(),
});

export type CompanyPayload = z.infer<typeof companyPayloadSchema> & {
  userId: string;
};

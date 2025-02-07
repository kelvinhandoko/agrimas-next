import { type InputJsonValue } from "@prisma/client/runtime/library";
import { z } from "zod";

export const errorLogPayloadSchema = z.object({
  path: z.string(),
  stackTrace: z.custom<InputJsonValue | undefined>(),
  message: z.string(),
  statusCode: z.string().nullish(),
  userId: z.string().nullish(),
  ipAddress: z.string().nullish(),
  companyId: z.string().nullish(),
  input: z.custom<InputJsonValue | undefined>(),
});

export type ErrorLogPayload = z.infer<typeof errorLogPayloadSchema>;

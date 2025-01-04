import { z } from "zod";

export const authPayloadSchema = z.object({
  username: z.string().min(1, "Username required"),
  password: z.string().min(1, "password required"),
});

export type AuthPayload = z.infer<typeof authPayloadSchema>;

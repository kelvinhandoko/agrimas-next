import { basicQuery } from "@/server/common/models/basic";
import { Role } from "@prisma/client";
import { z } from "zod";

export const userPayloadSchema = z.object({
  id: z.string().optional(),
  username: z.string({ required_error: "username wajib diisi" }),
  password: z.string({ required_error: "password wajib diisi" }),
  role: z.nativeEnum(Role),
});

export type UserPayload = z.infer<typeof userPayloadSchema>;

export const UserGetAllQuerySchema = basicQuery;

export type GetAllUserQuery = z.infer<typeof UserGetAllQuerySchema>;

export const chooseCompanyPayloadSchema = z.object({
  companyId: z.string(),
});

export type ChooseCompanyPayload = z.infer<typeof chooseCompanyPayloadSchema>;

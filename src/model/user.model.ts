import { Role } from "@prisma/client";
import { z } from "zod";

import { type WithCompany, basicQuery } from "@/server/common/models/basic";

export const userPayloadSchema = z.object({
  id: z.string().optional().describe("The name to say hello too."),
  username: z.string().trim().min(1, { message: "username wajib diisi" }),
  password: z.string().trim().min(1, { message: "password wajib diisi" }),
  role: z.nativeEnum(Role),
});

export type UserPayload = z.infer<typeof userPayloadSchema>;

export type EmployeePayload = UserPayload & WithCompany;

export const UserGetAllQuerySchema = basicQuery;

export type GetAllUserQuery = z.infer<typeof UserGetAllQuerySchema> &
  WithCompany;

export const chooseCompanyPayloadSchema = z.object({
  companyId: z.string(),
});

export type ChooseCompanyPayload = z.infer<typeof chooseCompanyPayloadSchema>;

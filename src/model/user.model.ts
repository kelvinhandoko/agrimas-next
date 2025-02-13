import { type Prisma, Role } from "@prisma/client";
import { z } from "zod";

import { type WithCompany, basicQuery } from "@/server/common/models/basic";

type UserInclude<T> = {
  include?: Prisma.Subset<T, Prisma.SupplierInclude>;
};

export const userPayloadSchema = z.object({
  id: z.string().optional(),
  username: z.string().trim().min(1, { message: "username wajib diisi" }),
  password: z.string().trim().min(1, { message: "password wajib diisi" }),
  role: z.nativeEnum(Role),
});

export type UserPayload = z.infer<typeof userPayloadSchema>;

export type EmployeePayload = UserPayload & WithCompany;

export const UserGetAllQuerySchema = basicQuery;

export type GetAllUserQuery<T> = z.infer<typeof UserGetAllQuerySchema> &
  WithCompany &
  UserInclude<T>;

export const chooseCompanyPayloadSchema = z.object({
  companyId: z.string(),
});

export type ChooseCompanyPayload = z.infer<typeof chooseCompanyPayloadSchema>;

import { AccountClass, type Prisma } from "@prisma/client";
import { z } from "zod";

import { type WithCompany, basicQuery } from "@/server/common/models/basic";

type GroupAccountInclude<T> = {
  include?: Prisma.Subset<T, Prisma.GroupAccountInclude>;
};

export const groupAccountPayloadSchema = z.object({
  name: z.string(),
  accountClass: z.nativeEnum(AccountClass, {
    invalid_type_error: "kelas akun tidak valid",
  }),
  code: z.string().optional(),
  companyId: z.string().optional(),
  id: z.string().optional(),
});

export type GroupAccountPayload = z.infer<typeof groupAccountPayloadSchema>;

export const getAllGroupAccountQuerySchema = basicQuery;

export type GetAllGroupAccountQuery<T> = z.infer<
  typeof getAllGroupAccountQuerySchema
> &
  GroupAccountInclude<T> &
  WithCompany;

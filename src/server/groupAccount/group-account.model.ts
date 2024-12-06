import { basicQuery } from "@/server/common/models/basic";
import { AccountClass, type Prisma } from "@prisma/client";
import { z } from "zod";

type GroupAccountInclude<T> = {
  include?: Prisma.Subset<T, Prisma.GroupAccountInclude>;
};

export const groupAccountPayloadSchema = z.object({
  name: z.string(),
  accountClass: z.nativeEnum(AccountClass, {
    invalid_type_error: "kelas akun tidak valid",
  }),
  code: z.string().optional(),
  companyId: z.string({ required_error: "perusahaan tidak boleh kosong" }),
  id: z.string().optional(),
});

export type GroupAccountPayload = z.infer<typeof groupAccountPayloadSchema>;

export const getAllGroupAccountQuerySchema = basicQuery;

export type GetAllGroupAccountQuery<T> = z.infer<
  typeof getAllGroupAccountQuerySchema
> &
  GroupAccountInclude<T>;

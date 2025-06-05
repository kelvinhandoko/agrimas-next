import { AccountClass } from "@prisma/client";
import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  getQuery,
  paginatedQuery,
} from "@/server/common/models/basic";

export const groupAccountPayloadSchema = z.object({
  name: z.string(),
  accountClass: z.nativeEnum(AccountClass, {
    invalid_type_error: "kelas akun tidak valid",
  }),
  code: z.string().optional(),
  id: z.string().optional(),
});

export type GroupAccountPayload = z.infer<typeof groupAccountPayloadSchema> &
  WithCompany;

export const getGroupAccountQuerySchema = getQuery;

export type GetGroupAccountQuery = z.infer<typeof getGroupAccountQuerySchema> &
  WithCompany;

export const getPaginatedGroupAccountQuerySchema =
  getGroupAccountQuerySchema.merge(paginatedQuery);

export type GetPaginatedGroupAccountQuery = z.infer<
  typeof getPaginatedGroupAccountQuerySchema
> &
  WithCompany;

export const getCursorGroupAccountQuerySchema =
  getGroupAccountQuerySchema.merge(cursorQuery);

export type GetCursorGroupAccountQuery = z.infer<
  typeof getCursorGroupAccountQuerySchema
> &
  WithCompany;

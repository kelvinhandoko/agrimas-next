import { Laporan, NormalPosition } from "@prisma/client";
import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  getQuery,
  paginatedQuery,
} from "@/server/common/models/basic";

export const accountPayloadSchema = z.object({
  name: z
    .string({ required_error: "nama akun tidak boleh kosong" })
    .min(1, "nama akun minimal 1 huruf."),
  groupAccountId: z.string({
    required_error: "kelompok akun tidak boleh kosong",
  }),
  posisi: z.nativeEnum(NormalPosition, {
    message: "posisi akun antara debit atau kredit",
    required_error: "posisi akun tidak boleh kosong",
  }),
  reports: z
    .array(z.nativeEnum(Laporan, { message: "laporan tidak valid" }))
    .min(1, "laporan tidak boleh kosong"),
  id: z.string().optional(),
});

export type AccountPayload = z.infer<typeof accountPayloadSchema> & WithCompany;

export const getAccountQuerySchema = getQuery.extend({
  groupAccountId: z.string().optional(),
});

export type GetAccountQuery = z.infer<typeof getAccountQuerySchema> &
  WithCompany;

export const getPaginatedAccountQuerySchema = paginatedQuery.merge(
  getAccountQuerySchema,
);

export type PaginatedAccountQuery = z.infer<
  typeof getPaginatedAccountQuerySchema
> &
  WithCompany;

export const cursoredAccountQuerySchema = cursorQuery.merge(
  getAccountQuerySchema,
);

export type CursoredAccountQuery = z.infer<typeof cursoredAccountQuerySchema> &
  WithCompany;

export const getDetailAccountQuerySchema = z.object({
  id: z.string(),
});

export type GetDetailAccountQuery = z.infer<typeof getDetailAccountQuerySchema>;

export const updateBalancePayloadSchema = z.object({
  id: z.string(),
  balance: z.number().nonnegative(),
});

export type UpdateBalancePayload = z.infer<typeof updateBalancePayloadSchema>;

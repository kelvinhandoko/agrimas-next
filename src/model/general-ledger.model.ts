import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  getQuery,
  paginatedQuery,
} from "@/server/common";

export const generalLedgerPayloadSchema = z.object({
  id: z.string().optional(),
  accountId: z.string().describe("id akun"),
  journalDetailId: z.string().describe("id detail jurnal"),
  amount: z.number().describe("jumlah"),
});

export type GeneralLedgerPayload = z.infer<typeof generalLedgerPayloadSchema> &
  WithCompany;

export const getGeneralLedgerQuerySchema = getQuery.extend({
  accountId: z.string().optional(),
});

export type GetGeneralLedgerQuery = z.infer<
  typeof getGeneralLedgerQuerySchema
> &
  WithCompany;

export const paginatedGeneralLedgerQuerySchema =
  getGeneralLedgerQuerySchema.merge(paginatedQuery);

export type PaginatedGeneralLedgerQuery = z.infer<
  typeof paginatedGeneralLedgerQuerySchema
> &
  WithCompany;

export const cursoredGeneralLedgerQuerySchema =
  getGeneralLedgerQuerySchema.merge(cursorQuery);

export type CursoredGeneralLedgerQuery = z.infer<
  typeof cursoredGeneralLedgerQuerySchema
> &
  WithCompany;

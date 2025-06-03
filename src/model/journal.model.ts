import { journalDetailPayloadSchema } from "@/model/journal-detail.model";
import { JournalType } from "@prisma/client";
import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  getQuery,
  paginatedQuery,
} from "@/server/common/models/basic";

export const journalPayloadSchema = z.object({
  id: z.string().optional(),
  date: z.date({ required_error: "tanggal perlu diisi" }),
  ref: z.string().optional(),
  description: z.string().nullish(),
  type: z.nativeEnum(JournalType, {
    invalid_type_error: "tipe jurnal tidak valid",
  }),
  details: z.array(journalDetailPayloadSchema.omit({ journalId: true })),
});

export type JournalPayload = z.infer<typeof journalPayloadSchema> & {
  companyId: string;
};

export const getJournalQuerySchema = getQuery.extend({
  accountId: z.string().optional(),
});

export type GetAllJournalQuery = z.infer<typeof getJournalQuerySchema> &
  WithCompany;

export const paginatedJournalQuerySchema = getQuery.merge(paginatedQuery);

export type PaginatedJournalQuery = z.infer<
  typeof paginatedJournalQuerySchema
> &
  WithCompany;

export const cursorJournalQuerySchema = getQuery.merge(cursorQuery);

export type CursorJournalQuery = z.infer<typeof cursorJournalQuerySchema> &
  WithCompany;

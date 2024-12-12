import { journalDetailPayloadSchema } from "@/model/journal-detail.model";
import { JournalType, Prisma } from "@prisma/client";
import { z } from "zod";

import { basicQuery } from "@/server/common/models/basic";

type JournalInclude<T> = {
  include?: Prisma.Subset<T, Prisma.JournalInclude>;
};

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

export const getAllJournalQuerySchema = basicQuery;

export type GetAllJournalQuery<T> = z.infer<typeof getAllJournalQuerySchema> &
  JournalInclude<T>;

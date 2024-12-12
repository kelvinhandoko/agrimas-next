import { journalDetailPayloadSchema } from "@/model/journal-detail.model";
import { JournalType } from "@prisma/client";
import { z } from "zod";

export const journalPayloadSchema = z.object({
  id: z.string().optional(),
  date: z.date(),
  ref: z.string().optional(),
  description: z.string().nullish(),
  type: z.nativeEnum(JournalType, {
    invalid_type_error: "tipe jurnal tidak valid",
  }),
  companyId: z.string({ required_error: "perusahaan tidak boleh kosong" }),
  details: z.array(journalDetailPayloadSchema.omit({ journalId: true })),
});

export type JournalPayload = z.infer<typeof journalPayloadSchema>;

import { z } from "zod";

import { dateRangeSchema } from "@/server/common/models/basic";

export const journalDetailPayloadSchema = z.object({
  id: z.string().optional(),
  debit: z.number().nonnegative("debit tidak boleh negatif").default(0),
  credit: z.number().nonnegative("kredit tidak boleh negatif").default(0),
  journalId: z.string({ required_error: "jurnal tidak boleh kosong" }),
  accountId: z
    .string({ required_error: "nama akun tidak boleh kosong" })
    .min(1, "nama akun tidak boleh kosong"),
  subAccountId: z.string().nullish(),
});

export type JournalDetailPayload = z.infer<typeof journalDetailPayloadSchema>;

export const getAllJournalDetailQuerySchema = dateRangeSchema.extend({
  accountId: z.string().optional(),
});

export type GetAllJournalDetailQuery = z.infer<
  typeof getAllJournalDetailQuerySchema
> & { companyId: string };

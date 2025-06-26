import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const generalLedgerPayloadSchema = z.object({
  id: z.string().optional(),
  accountId: z.string().describe("id akun"),
  journalDetailId: z.string().describe("id detail jurnal"),
  amount: z.number().describe("jumlah"),
});

export type GeneralLedgerPayload = z.infer<typeof generalLedgerPayloadSchema> &
  WithCompany;

import { purchaseReturnDetailPayloadSchema } from "@/model/purchase-return-detail.model";
import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const purchaseReturnPayloadSchema = z.object({
  id: z.string().optional().describe("id pengembalian"),
  date: z.date().describe("tanggal pengembalian"),
  ref: z.string().describe("ref pengembalian").optional(),
  note: z.string().optional().describe("note tambahan (optional)"),
  supplierId: z.string().describe("id supplier"),
  detail: z
    .array(purchaseReturnDetailPayloadSchema.omit({ purchaseReturnId: true }))
    .describe("detail pengembalian"),
});

export type PurchaseReturnPayload = z.infer<
  typeof purchaseReturnPayloadSchema
> &
  WithCompany;

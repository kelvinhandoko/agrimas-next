import { receiveItemDetailPayloadSchema } from "@/model/receive-item-detail.model";
import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const recieveItemPayloadSchema = z.object({
  id: z.string().optional().describe("id penerimaan"),
  purchaseId: z.string().describe("id pembelian"),
  receiveDate: z.date().describe("tanggal penerimaan"),
  note: z.string().optional().describe("catatan (opsional)"),
  details: z.array(
    receiveItemDetailPayloadSchema.omit({ receiveItemId: true }),
  ),
});

export type ReceiveItemPayload = z.infer<typeof recieveItemPayloadSchema> &
  WithCompany;

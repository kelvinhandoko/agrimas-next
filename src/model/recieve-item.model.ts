import { receiveItemDetailPayloadSchema } from "@/model/receive-item-detail.model";
import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const recieveItemPayloadSchema = z.object({
  id: z.string().optional().describe("id penerimaan"),
  purchaseId: z.string().describe("id pembelian"),
  ref: z.string().optional().describe("nomor referensi (opsional)"),
  receiveDate: z.date().describe("tanggal penerimaan"),
  note: z.string().optional().describe("catatan (opsional)"),
  details: z.array(
    receiveItemDetailPayloadSchema
      .omit({ receiveItemId: true })
      .superRefine((data, ctx) => {
        if (data.totalReceive + data.quantity > data.maxQuantity) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["quantity"],
            message: `Jumlah quantity terlalu besar (max :${data.maxQuantity - data.totalReceive}).`,
          });
        }
      }),
  ),
  tax: z
    .number()
    .nonnegative("ppn tidak boleh kurang dari 0")
    .default(0)
    .describe("ppn"),
  discount: z
    .number()
    .nonnegative("diskon tidak boleh kurang dari 0")
    .default(0)
    .describe("diskon"),
});

export type ReceiveItemPayload = z.infer<typeof recieveItemPayloadSchema> &
  WithCompany;

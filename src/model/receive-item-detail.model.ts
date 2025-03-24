import { z } from "zod";

export const receiveItemDetailPayloadSchema = z.object({
  id: z.string().optional().describe("id detail penerimaan"),
  receiveItemId: z.string().describe("id penerimaan"),

  productId: z.string().describe("id produk"),
  quantity: z
    .number()
    .nonnegative("jumlah tidak boleh kurang dari 0")
    .describe("jumlah"),
});

export type ReceiveItemDetailPayload = z.infer<
  typeof receiveItemDetailPayloadSchema
> & {
  purchaseId: string;
};

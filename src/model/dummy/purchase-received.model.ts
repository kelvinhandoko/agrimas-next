import { z } from "zod";

// import { WithCompany } from "@/server/common";

export const purchaseReceivedDetailPayloadSchema = z.object({
  id: z.string().optional().describe("id pembelian detail"),
  productId: z.string().describe("id produk"),
  quantity: z.number().describe("jumlah barang"),
});

export const purchaseReceivedPayloadSchema = z.object({
  id: z.string().optional().describe("id penerimaan"),
  purchaseOrderId: z.string().describe("id pembelian"),
  receivedDate: z.date().describe("tanggal pembelian barang"),
  note: z.string().optional().describe("note tambahan (optional)"),
  supplierId: z.string().describe("id supplier"),
  totalItem: z.number().optional().describe("total item opsional"),
  totalPrice: z.number().optional().describe("total price optional"),
  detail: z.array(purchaseReceivedDetailPayloadSchema),
});

// export type PurchaseReceivedPayload = z.infer<
//   typeof purchaseReceivedPayloadSchema
// > &
//   WithCompany;

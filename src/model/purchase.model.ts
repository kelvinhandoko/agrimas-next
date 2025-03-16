import { purchaseDetailPayloadSchema } from "@/model/purchase-detail.model";
import { purchasePaymentPayloadSchema } from "@/model/purchase-payment.model";
import {
  type Prisma,
  TRANSACTION_PAYMENT_STATUS,
  TRANSACTION_STATUS,
} from "@prisma/client";
import { z } from "zod";

import { type WithCompany } from "@/server/common";

type PurchaseInclude<T> = {
  include?: Prisma.Subset<T, Prisma.PurchaseInclude>;
};

export const purchasePayloadSchema = z.object({
  id: z.string().optional().describe("id pembelian"),
  purchaseDate: z.date().describe("tanggal pembelian barang"),
  ref: z.string().optional().describe("no referensi pembelian (optional)"),
  note: z.string().optional().describe("note tambahan (optional)"),
  discount: z.number().nonnegative().default(0).describe("diskon (optional)"),
  supplierId: z.string().describe("id supplier"),
  detail: z
    .array(purchaseDetailPayloadSchema.omit({ purchaseId: true }))
    .describe("detail pembelian"),
  payment: purchasePaymentPayloadSchema.optional(),
});

export type PurchasePayload = z.infer<typeof purchasePayloadSchema> &
  WithCompany;

export const updatePurchaseStatusSchema = z.object({
  id: z.string().describe("id pembelian"),
  status: z.nativeEnum(TRANSACTION_STATUS).optional(),
  paymentStatus: z.nativeEnum(TRANSACTION_PAYMENT_STATUS).optional(),
});

export type UpdatePurchaseStatusPayload = z.infer<
  typeof updatePurchaseStatusSchema
>;

export const purchaseDetailQuerySchema = z.object({
  id: z.string().describe("id pembelian"),
});

export type PurchaseDetailQuery<T> = z.infer<typeof purchaseDetailQuerySchema> &
  PurchaseInclude<T>;

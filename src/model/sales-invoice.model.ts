import { salesInvoiceDetailPayloadSchema } from "@/model/sales-invoice-detail.model";
import { TRANSACTION_PAYMENT_STATUS } from "@prisma/client";
import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const salesInvoicePayloadSchema = z.object({
  id: z.string().optional(),
  salesPersonId: z
    .string({ required_error: "sales tidak boleh kosong" })
    .min(1, "sales tidak boleh kosong"),
  ref: z.string().nullish(),
  date: z.date({ required_error: "tanggal tidak boleh kosong" }),
  customerId: z
    .string({ required_error: "customer tidak boleh kosong" })
    .min(1, "customer tidak boleh kosong"),
  tax: z.number().nonnegative("pajak tidak boleh negatif").default(0),
  note: z.string().nullish(),
  discount: z.number().nonnegative("diskon tidak boleh negatif").default(0),
  details: z.array(
    salesInvoiceDetailPayloadSchema.omit({ salesInvoiceId: true }),
  ),
});

export type SalesInvoicePayload = z.infer<typeof salesInvoicePayloadSchema> &
  WithCompany & { cogs: number };

export const updateSalesInvoicePayloadSchema = salesInvoicePayloadSchema
  .pick({
    date: true,
  })
  .extend({
    id: z.string(),
    totalPayment: z.number().positive().optional(),
    status: z.nativeEnum(TRANSACTION_PAYMENT_STATUS).optional(),
  });

export type UpdateSalesInvoicePayload = z.infer<
  typeof updateSalesInvoicePayloadSchema
>;

export const getDetailSalesInvoicePayloadSchema = z.object({
  by: z.enum(["id", "ref"]).default("id"),
  identifier: z.string(),
});

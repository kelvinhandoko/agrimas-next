import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const paymentMethodPayloadSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: "nama metode wajib diisi" })
    .min(1, "nama metode wajib diisi"),
  accountNumber: z.string().nullish(),
  initialAmount: z.number().nonnegative("saldo tidak boleh lebih kecil dari 0"),
  accountId: z.string().nullish(),
});

export type PaymentMethodPayload = z.infer<typeof paymentMethodPayloadSchema> &
  WithCompany;

export const updatePaymentMethodPayloadSchema = paymentMethodPayloadSchema
  .required({ id: true })
  .extend({
    amount: z.number().nonnegative("saldo tidak boleh lebih kecil dari 0"),
  });

export type UpdatePaymentMethodPayload = z.infer<
  typeof updatePaymentMethodPayloadSchema
> &
  WithCompany;

export const getDetailPaymentMethodQuerySchema = z.object({
  type: z.enum(["id", "name_accountNumber"]).default("id"),
  identifier: z.union([
    z.string(),
    z.object({
      name: z.string(),
      accountNumber: z.string().nullish(),
    }),
  ]),
});

export type GetDetailPaymentMethodQuery = z.infer<
  typeof getDetailPaymentMethodQuerySchema
>;

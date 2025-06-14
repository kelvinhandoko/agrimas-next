import { Laporan } from "@prisma/client";
import { z } from "zod";

import { type WithCompany, basicQuery } from "@/server/common";

export const reportPayloadSchema = z.object({
  report: z.nativeEnum(Laporan, { message: "laporan tidak valid" }),

  id: z.string().optional(),
  accountId: z.string({ required_error: "nama akun tidak boleh kosong" }),
  companyId: z.string({ required_error: "perusahaan tidak boleh kosong" }),
});

export type ReportPayload = z.infer<typeof reportPayloadSchema>;

export const receiveableReportQuerySchema = basicQuery
  .pick({
    dateRange: true,
  })
  .extend({
    customerId: z.string().optional(),
  });

export type ReceiveableReportQuery = z.infer<
  typeof receiveableReportQuerySchema
> &
  WithCompany;

export const payableReportQuerySchema = basicQuery
  .pick({
    dateRange: true,
  })
  .extend({
    supplier: z.string().optional(),
  });

export type PayableReportQuery = z.infer<typeof payableReportQuerySchema> &
  WithCompany;

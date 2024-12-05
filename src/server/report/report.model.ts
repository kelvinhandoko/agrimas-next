import { Laporan } from "@prisma/client";
import { z } from "zod";

export const reportPayloadSchema = z.object({
  report: z.nativeEnum(Laporan, { message: "laporan tidak valid" }),

  id: z.string().optional(),
  accountId: z.string({ required_error: "nama akun tidak boleh kosong" }),
  companyId: z.string({ required_error: "perusahaan tidak boleh kosong" }),
});

export type ReportPayload = z.infer<typeof reportPayloadSchema>;

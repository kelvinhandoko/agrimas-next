import { basicQuery } from "@/server/common/models/basic";
import { Laporan, NormalPosition, type Prisma } from "@prisma/client";
import { z } from "zod";

export const accountPayloadSchema = z.object({
  name: z
    .string({ required_error: "nama akun tidak boleh kosong" })
    .min(1, "nama akun minimal 1 huruf."),
  companyId: z.string({ required_error: "perusahaan tidak boleh kosong" }),
  groupAccountId: z.string({
    required_error: "kelompok akun tidak boleh kosong",
  }),
  posisi: z.nativeEnum(NormalPosition, {
    message: "posisi akun antara debit atau kredit",
    required_error: "posisi akun tidak boleh kosong",
  }),
  report: z.array(z.nativeEnum(Laporan, { message: "laporan tidak valid" })),
  id: z.string().optional(),
});

export type AccountPayload = z.infer<typeof accountPayloadSchema>;

export const getAllAccountQuerySchema = basicQuery;

export type GetAllAccountQuery<T> = z.infer<typeof getAllAccountQuerySchema> & {
  include?: Prisma.Subset<T, Prisma.AccountInclude>;
};

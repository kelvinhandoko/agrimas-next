import { z } from "zod";

import { basicQuery } from "@/server/common/models/basic";

export const subAccountPayloadSchema = z.object({
  name: z
    .string({ required_error: "nama akun tidak boleh kosong" })
    .min(1, "nama akun minimal 1 huruf."),
  companyId: z.string({ required_error: "perusahaan tidak boleh kosong" }),
  accountId: z.string({
    required_error: "nama akun tidak boleh kosong",
  }),
  id: z.string().optional(),
});

export type SubAccountPayload = z.infer<typeof subAccountPayloadSchema>;

export const getAllSubAccountQuerySchema = basicQuery;

export type GetAllSubAccountQuery = z.infer<typeof getAllSubAccountQuerySchema>;

export const getDetailSubAccountQuerySchema = z.object({
  id: z.string(),
});

export type GetDetailSubAccountQuery = z.infer<
  typeof getDetailSubAccountQuerySchema
>;

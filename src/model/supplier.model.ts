import { z } from "zod";

import {
  type WithCompany,
  cursorQuery,
  getQuery,
  paginatedQuery,
} from "@/server/common/models/basic";

export const supplierPayloadSchema = z.object({
  id: z.string().optional(),
  nama: z.string().min(1, { message: "Nama supplier wajib diisi" }),
  alamat: z.string().nullable(),
  idCard: z.string().min(1, { message: "npwp / ktp wajib diisi" }),
  kode: z.string().min(1, { message: "Kode supplier wajib diisi" }),
  pic_name: z.string().min(1, { message: "Nama PIC wajib diisi" }),
  phone_number: z.string().min(1, { message: "Nomor telepon wajib diisi" }),
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" }),
  fax: z.string().min(1, { message: "Nomor fax wajib diisi" }),
  website: z.string().min(1, { message: "Website wajib diisi" }),
  kode_pos: z.string().min(1, { message: "Kode pos wajib diisi" }),
});

export type SupplierPayload = z.infer<typeof supplierPayloadSchema> &
  WithCompany;

export const getAllSupplierQuerySchema = getQuery.omit({ dateRange: true });

export type GetAllSupplierQuery = z.infer<typeof getAllSupplierQuerySchema> &
  WithCompany;

export const paginatedSupplierQuerySchema =
  getAllSupplierQuerySchema.merge(paginatedQuery);

export type PaginatedSupplierQuery = z.infer<
  typeof paginatedSupplierQuerySchema
> &
  WithCompany;

export const cursoredSupplierQuerySchema =
  getAllSupplierQuerySchema.merge(cursorQuery);

export type CursoredSupplierQuery = z.infer<
  typeof cursoredSupplierQuerySchema
> &
  WithCompany;

export const GetDetailSupplierByIdQuerySchema = z.object({
  id: z.string(),
});

export type GetDetailSupplierByIdQuery = z.infer<
  typeof GetDetailSupplierByIdQuerySchema
>;

export const getUniqueSupplierQuerySchema = z.object({
  nama: z.string(),
});

export type GetUniqueSupplierQuery = z.infer<
  typeof getUniqueSupplierQuerySchema
> &
  WithCompany;

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
  alamat: z.string().min(1, { message: "Nama supplier wajib diisi" }),
  idCard: z.string().optional().default(""),
  kode: z.string().optional().default(""),
  pic_name: z.string().optional().default(""),
  phone_number: z.string().optional().default(""),
  email: z.string().optional().default(""),
  fax: z.string().optional().default(""),
  website: z.string().optional().default(""),
  kode_pos: z.string().optional().default(""),
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

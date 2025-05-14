import { z } from "zod";

import { type WithCompany, basicQuery } from "@/server/common/models/basic";

export const supplierPayloadSchema = z.object({
  nama: z.string().min(1, { message: "Nama supplier wajib diisi" }),
  alamat: z.string().nullable(),
  id: z.string().optional(),
});

export type SupplierPayload = z.infer<typeof supplierPayloadSchema> &
  WithCompany;

export const getAllSupplierQuerySchema = basicQuery;

export type GetAllSupplierQuery = z.infer<typeof getAllSupplierQuerySchema>;

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

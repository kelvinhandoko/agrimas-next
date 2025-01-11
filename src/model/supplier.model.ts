import { type Prisma } from "@prisma/client";
import { TypeOf, z } from "zod";

import { type WithCompany, basicQuery } from "@/server/common/models/basic";

type SupplierInclude<T> = {
  include?: Prisma.Subset<T, Prisma.SupplierInclude>;
};
export const supplierPayloadSchema = z.object({
  nama: z.string({ required_error: "nama supplier wajib diisi" }),
  alamat: z.string().nullable(),
  id: z.string().optional(),
});

export type SupplierPayload = z.infer<typeof supplierPayloadSchema> &
  WithCompany;

export const getAllSupplierQuerySchema = basicQuery;

export type GetAllSupplierQuery<T> = z.infer<typeof getAllSupplierQuerySchema> &
  SupplierInclude<T>;

export const GetDetailSupplierByIdQuerySchema = z.object({
  id: z.string(),
});

export type GetDetailSupplierByIdQuery<T> = z.infer<
  typeof GetDetailSupplierByIdQuerySchema
> &
  SupplierInclude<T>;

export const getUniqueSupplierQuerySchema = z.object({
  nama: z.string(),
});

export type GetUniqueSupplierQuery = z.infer<
  typeof getUniqueSupplierQuerySchema
> &
  WithCompany;

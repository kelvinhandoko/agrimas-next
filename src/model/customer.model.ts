import { type Prisma } from "@prisma/client";
import { z } from "zod";

import { type WithCompany, basicQuery } from "@/server/common/models/basic";

type CustomerInclude<T> = {
  include?: Prisma.Subset<T, Prisma.CustomerInclude>;
};
export const customerPayloadSchema = z.object({
  nama: z.string().min(1, { message: "Nama customer wajib diisi" }),
  alamat: z.string().nullable(),
  id: z.string().optional(),
});

export type CustomerPayload = z.infer<typeof customerPayloadSchema> &
  WithCompany;

export const getAllCustomerQuerySchema = basicQuery;

export type GetAllcustomerQuery<T> = z.infer<typeof getAllCustomerQuerySchema> &
  CustomerInclude<T>;

export const GetDetailCustomerByIdQuerySchema = z.object({
  id: z.string(),
});

export type GetDetailcustomerByIdQuery<T> = z.infer<
  typeof GetDetailCustomerByIdQuerySchema
> &
  CustomerInclude<T>;

export const getUniqueCustomerQuerySchema = z.object({
  nama: z.string(),
});

export type GetUniqueCustomerQuery = z.infer<
  typeof getUniqueCustomerQuerySchema
> &
  WithCompany;

import { LIMIT } from "@/constant";
import { z } from "zod";

export type WithCompany = {
  companyId: string;
};

export const orderEnum = z.enum(["asc", "desc"]).default("asc").optional();

export const dateRangeSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});

export type DateRange = z.infer<typeof dateRangeSchema>;

export const basicQuery = z.object({
  limit: z.number().min(5).max(100).default(LIMIT).describe("limit"),
  page: z.number().min(1).default(1).describe("page"),
  search: z.string().optional().describe("search"),
  infiniteScroll: z.boolean().default(false),
  takeAll: z.boolean().default(false),
  cursor: z.string().optional(),
});

export type BasicQuery = z.infer<typeof basicQuery> & WithCompany;

export const paginatedQuery = basicQuery.pick({
  page: true,
  limit: true,
  search: true,
});

export type PaginatedQuery = z.infer<typeof paginatedQuery> & WithCompany;

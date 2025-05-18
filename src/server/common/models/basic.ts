import { LIMIT } from "@/constant";
import { z } from "zod";

export type WithCompany = {
  companyId: string;
};

export const orderEnum = z.enum(["asc", "desc"]).default("asc").optional();

export const dateRangeSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export type DateRange = z.infer<typeof dateRangeSchema>;

export const basicQuery = z.object({
  limit: z.number().min(5).max(100).default(LIMIT).describe("limit"),
  page: z.number().min(1).default(1).describe("page"),
  search: z.string().optional().describe("search"),
  infiniteScroll: z.boolean().default(false),
  takeAll: z.boolean().default(false),
  cursor: z.string().optional(),
  dateRange: dateRangeSchema.optional(),
});

export type BasicQuery = z.infer<typeof basicQuery> & WithCompany;

export const getQuery = basicQuery.pick({
  search: true,
});

export type GetQuery = z.infer<typeof getQuery> & WithCompany;

export const cursorQuery = basicQuery.pick({
  limit: true,
  cursor: true,
  search: true,
  dateRange: true,
});

export const paginatedQuery = basicQuery.pick({
  page: true,
  limit: true,
  search: true,
  dateRange: true,
});

export type PaginatedQuery = z.infer<typeof paginatedQuery> & WithCompany;

export type CursorQuery = z.infer<typeof cursorQuery> & WithCompany;

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
  limit: z.number().min(5).max(100).default(LIMIT),
  page: z.number().min(1).default(1),
  search: z.string().optional(),
  infiniteScroll: z.boolean().default(false),
  takeAll: z.boolean().default(false),
  cursor: z.string().optional(),
  companyId: z.string().default(""),
});

export type BasicQuery = z.infer<typeof basicQuery>;

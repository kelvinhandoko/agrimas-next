import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { getReceiveableReportController } from "@/server/report/controller/get-receiveable-report.controller";

export const reportRouter = createTRPCRouter({
  receivable: getReceiveableReportController,
});

export type ReportRouterOutput = inferRouterOutputs<typeof reportRouter>;

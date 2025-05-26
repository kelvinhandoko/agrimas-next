import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { getPayableReportController } from "@/server/report/controller/get-payable-report.controller";
import { getReceiveableReportController } from "@/server/report/controller/get-receiveable-report.controller";

export const reportRouter = createTRPCRouter({
  receivable: getReceiveableReportController,
  payable: getPayableReportController,
});

export type ReportRouterOutput = inferRouterOutputs<typeof reportRouter>;

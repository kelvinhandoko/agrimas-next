import { createCallerFactory, createTRPCRouter } from "@/trpc/trpc";

import { accountRouter } from "@/server/account";
import { companyRouter } from "@/server/company/company.router";
import { customerRouter } from "@/server/customer";
import { errorLogRouter } from "@/server/errorLog";
import { groupAccountRouter } from "@/server/groupAccount/group-account.router";
import { journalRouter } from "@/server/journal/journal.router";
import { journalDetailRouter } from "@/server/journalDetail/journal-detail.router";
import { productRouter } from "@/server/product/product.router";
import { purchaseRouter } from "@/server/purchase/purchase.router";
import { purchasePaymentRouter } from "@/server/purchasePayment/purchase-payment.router";
import { receiveItemRouter } from "@/server/recieveItem/receive-item.router";
import { salesInvoiceRouter } from "@/server/salesInvoice/sales-invoice.router";
import { salesPersonRouter } from "@/server/salesPerson/sales-person.router";
import { supplierRouter } from "@/server/supplier";
import { userRouter } from "@/server/user/user.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  groupAccount: groupAccountRouter,
  journal: journalRouter,
  journalDetail: journalDetailRouter,
  company: companyRouter,
  supplier: supplierRouter,
  customer: customerRouter,
  errorLog: errorLogRouter,
  salesPerson: salesPersonRouter,
  salesInvoice: salesInvoiceRouter,
  user: userRouter,
  product: productRouter,
  purchase: purchaseRouter,
  receiveItem: receiveItemRouter,
  purchasePayment: purchasePaymentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

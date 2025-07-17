import { createCallerFactory, createTRPCRouter } from "@/trpc/trpc";

import { accountRouter } from "@/server/account";
import { companyRouter } from "@/server/company/company.router";
import { customerRouter } from "@/server/customer";
import { generalLedgerRouter } from "@/server/generalLedger/generalLedger.router";
import { groupAccountRouter } from "@/server/groupAccount/group-account.router";
import { invoiceReturnRouter } from "@/server/invoiceReturn/invoice-return.router";
import { journalRouter } from "@/server/journal/journal.router";
import { paymentMethodRouter } from "@/server/paymentMethod/payment-method.router";
import { productRouter } from "@/server/product/product.router";
import { purchaseRouter } from "@/server/purchase/purchase.router";
import { purchaseInvoiceRouter } from "@/server/purchaseInvoice/purchase-invoice.router";
import { purchasePaymentRouter } from "@/server/purchasePayment/purchase-payment.router";
import { purchaseReturnRouter } from "@/server/purchaseReturn/purchase-return.router";
import { purchasedProductRouter } from "@/server/purchasedProduct/purchased-product.router";
import { receiveItemRouter } from "@/server/recieveItem/receive-item.router";
import { reportRouter } from "@/server/report/report.router";
import { salesInvoiceRouter } from "@/server/salesInvoice/sales-invoice.router";
import { salesPaymentRouter } from "@/server/salesPayment/sales-payment.router";
import { salesPersonRouter } from "@/server/salesPerson/sales-person.router";
import { soldProductRouter } from "@/server/soldProduct/sold-product.router";
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
  generalLedger: generalLedgerRouter,
  company: companyRouter,
  supplier: supplierRouter,
  customer: customerRouter,
  salesPerson: salesPersonRouter,
  salesInvoice: salesInvoiceRouter,
  salesPayment: salesPaymentRouter,
  user: userRouter,
  product: productRouter,
  purchase: purchaseRouter,
  receiveItem: receiveItemRouter,
  purchasePayment: purchasePaymentRouter,
  paymentMethod: paymentMethodRouter,
  report: reportRouter,
  purchaseInvoice: purchaseInvoiceRouter,
  purchaseReturn: purchaseReturnRouter,
  invoiceReturn: invoiceReturnRouter,
  purchasedProduct: purchasedProductRouter,
  soldProduct: soldProductRouter,
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

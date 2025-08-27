import { type JournalPayload } from "@/model";
import { type SalesInvoicePayload } from "@/model/sales-invoice.model";

import { type IGetDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { type ICreateJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { type IGetTotalCOGSUseCase } from "@/server/product/use-cases/get-total-cogs.use-case";
import { type ICreateSalesInvoiceUseCase } from "@/server/salesInvoice/use-cases/create-sales-invoice.use-case";
import { type ICreateSalesInvoiceDetailUseCase } from "@/server/salesInvoiceDetail/use-cases/create-sales-invoice-detail.use-case";
import { type HandleSoldProductOrchestrator } from "@/server/soldProduct/orchestrator/handle-sold-product.orchestrator";

export const createSalesInvoiceOrchestrator =
  (usecases: {
    createSalesInvoice: ICreateSalesInvoiceUseCase;
    handleSoldProduct: HandleSoldProductOrchestrator;
    createSalesInvoiceDetail: ICreateSalesInvoiceDetailUseCase;
    getTotalCOGS: IGetTotalCOGSUseCase;
    createJournal: ICreateJournalOrchestrator;
    getDefaultAccount: IGetDefaultAccountUseCase;
  }) =>
  async (payload: SalesInvoicePayload) => {
    const {
      createSalesInvoiceDetail,
      createSalesInvoice,
      getDefaultAccount,
      getTotalCOGS,
      handleSoldProduct,
      createJournal,
    } = usecases;

    const totalCOGS = await getTotalCOGS(
      payload.details.map(({ quantity, productId }) => {
        return {
          id: productId,
          quantity,
        };
      }),
    );

    const salesInvoice = await createSalesInvoice({
      ...payload,
      cogs: totalCOGS,
      companyId: payload.companyId,
    });

    await Promise.all(
      payload.details.map(async (detail) => {
        await handleSoldProduct({
          productId: detail.productId,
          quantity: detail.quantity,
          customerId: payload.customerId,
        });
        await createSalesInvoiceDetail({
          ...detail,
          salesInvoiceId: salesInvoice.id,
        });
      }),
    );

    const defaultData = await getDefaultAccount(payload.companyId);

    const total = payload.details.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );

    const totalTax =
      salesInvoice.tax +
      payload.details.reduce((acc, curr) => acc + curr.tax, 0);

    const totalDiscount =
      (payload.discount || 0) +
      payload.details.reduce(
        (acc, curr) => acc + curr.discount * curr.quantity,
        0,
      );

    const journalDetailPayload = [] as JournalPayload["details"];

    // Jurnal untuk penjualan (selalu ada)
    journalDetailPayload.push(
      {
        accountId: defaultData.get("PENJUALAN")!,
        credit: total,
        debit: 0,
      },
      {
        accountId: defaultData.get("HPP")!,
        credit: 0,
        debit: totalCOGS,
      },
      {
        accountId: defaultData.get("PERSEDIAAN")!,
        credit: totalCOGS,
        debit: 0,
      },
    );

    if (totalTax > 0) {
      journalDetailPayload.push({
        accountId: defaultData.get("PPN_KELUARAN")!,
        credit: totalTax,
        debit: 0,
      });
    }

    if (totalDiscount > 0) {
      journalDetailPayload.push({
        accountId: defaultData.get("DISKON_PENJUALAN")!,
        credit: 0,
        debit: totalDiscount,
      });
    }

    const receivableAmount = total + totalTax - totalDiscount;
    journalDetailPayload.push({
      accountId: defaultData.get("PIUTANG_USAHA")!,
      credit: 0,
      debit: receivableAmount,
    });

    await createJournal({
      companyId: payload.companyId,
      date: payload.date,
      description: `penjualan ${salesInvoice.ref}`,
      type: "GENERAL",
      details: journalDetailPayload,
    });

    return salesInvoice;
  };

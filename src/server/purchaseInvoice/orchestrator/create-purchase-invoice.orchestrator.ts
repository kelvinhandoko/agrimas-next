import { type JournalPayload } from "@/model";
import { type PurchaseInvoicePayload } from "@/model/purchase-invoice";

import { type IGetDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { type ICreateJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { type ICreatePurchaseInvoiceUseCase } from "@/server/purchaseInvoice/use-cases/create-purchase-invoice.use-case";

export const createPurchaseInvoiceOrchestrator =
  (usecases: {
    createPurchaseInvoice: ICreatePurchaseInvoiceUseCase;
    getDefaultAccount: IGetDefaultAccountUseCase;
    createJournal: ICreateJournalOrchestrator;
  }) =>
  async (payload: PurchaseInvoicePayload) => {
    const { createJournal, createPurchaseInvoice, getDefaultAccount } =
      usecases;

    const purchaseInvoice = await createPurchaseInvoice(payload);
    const defaultAccount = await getDefaultAccount(payload.companyId);
    const journalDetailPayload = [] as JournalPayload["details"];
    const { totalBefore, totalDiscount, totalTax } = purchaseInvoice;

    journalDetailPayload.push({
      accountId: defaultAccount.get("PERSEDIAAN")!,
      debit: totalBefore,
      credit: 0,
    });

    if (totalTax > 0) {
      journalDetailPayload.push({
        accountId: defaultAccount.get("PPN_MASUKAN")!,
        debit: totalTax,
        credit: 0,
      });
    }

    if (totalDiscount > 0) {
      journalDetailPayload.push({
        accountId: defaultAccount.get("POTONGAN_HARGA")!,
        debit: 0,
        credit: totalDiscount,
      });
    }

    const payableAmount = totalBefore + totalTax - totalDiscount;
    journalDetailPayload.push({
      accountId: defaultAccount.get("HUTANG_USAHA")!,
      debit: 0,
      credit: payableAmount,
    });

    await createJournal({
      companyId: payload.companyId,
      date: payload.date,
      description: `pembelian ${purchaseInvoice.ref}`,
      type: "GENERAL",
      details: journalDetailPayload,
    });

    return purchaseInvoice;
  };

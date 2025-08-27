import { type JournalPayload } from "@/model";
import { type InvoiceReturnPayload } from "@/model/invoice-return.model";

import { type GetDetailByIdCustomerUseCase } from "@/server/customer";
import { type IGetDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { type ICreateInvoiceReturnUseCase } from "@/server/invoiceReturn/use-cases/create-invoice-return.use-case";
import { type ICreateInvoiceReturnDetailUseCase } from "@/server/invoiceReturnDetail/use-cases/create-invoice-return-detail.use-case";
import { type ICreateJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { type HandleSoldProductOrchestrator } from "@/server/soldProduct/orchestrator/handle-sold-product.orchestrator";

export const createInvoiceReturnOrchestrator =
  (usecases: {
    createInvoiceReturn: ICreateInvoiceReturnUseCase;
    getCustomer: GetDetailByIdCustomerUseCase;
    createInvoiceReturnDetail: ICreateInvoiceReturnDetailUseCase;
    handleSoldProduct: HandleSoldProductOrchestrator;
    getDefaultAccount: IGetDefaultAccountUseCase;
    createJournal: ICreateJournalOrchestrator;
  }) =>
  async (payload: InvoiceReturnPayload) => {
    const {
      createInvoiceReturn,
      getCustomer,
      createInvoiceReturnDetail,
      handleSoldProduct,
      getDefaultAccount,
      createJournal,
    } = usecases;

    const customer = await getCustomer({ id: payload.customerId });
    const totalPayable = customer.totalPayable; // piutang customer

    const total = payload.detail.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0,
    );

    const invoiceReturn = await createInvoiceReturn(payload);

    await Promise.all(
      payload.detail.map(async (d) => {
        await handleSoldProduct({
          customerId: payload.customerId,
          productId: d.productId,
          return: d.quantity,
        });
        await createInvoiceReturnDetail({
          ...d,
          invoiceReturnId: invoiceReturn.id,
          companyId: invoiceReturn.companyId,
        });
      }),
    );

    // Create journal entries
    const defaultAccount = await getDefaultAccount(payload.companyId);
    const journalDetailPayload = [] as JournalPayload["details"];

    const receivableAccount = defaultAccount.get("PIUTANG_USAHA")!;
    const customerDepositAccount = defaultAccount.get("DEPOSIT_CUSTOMER")!;
    const inventoryAccount = defaultAccount.get("PERSEDIAAN")!;
    const salesReturnAccount = defaultAccount.get("RETUR_PENJUALAN")!;

    // Jurnal untuk menambah persediaan (barang kembali)
    journalDetailPayload.push({
      accountId: inventoryAccount,
      debit: total,
      credit: 0,
    });

    journalDetailPayload.push({
      accountId: salesReturnAccount,
      debit: total,
      credit: 0,
    });

    if (total <= totalPayable) {
      journalDetailPayload.push({
        accountId: receivableAccount,
        debit: 0,
        credit: total,
      });
    } else {
      if (totalPayable > 0) {
        journalDetailPayload.push({
          accountId: receivableAccount,
          debit: 0,
          credit: totalPayable,
        });
      }

      const depositAmount = total - totalPayable;
      journalDetailPayload.push({
        accountId: customerDepositAccount,
        debit: 0,
        credit: depositAmount,
      });
    }

    await createJournal({
      companyId: payload.companyId,
      date: payload.date,
      description: `retur penjualan ${invoiceReturn.ref}`,
      type: "GENERAL",
      details: journalDetailPayload,
    });

    return invoiceReturn;
  };

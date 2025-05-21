import { type PayableReportQuery } from "@/model";
import { groupBy } from "lodash";

import { type PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";

export const getPayableReportUseCase =
  (repo: PurchaseInvoiceRepository) => async (q: PayableReportQuery) => {
    const { data } = await repo.get({ ...q, limit: 100000, page: 1 });
    return groupBy(data, (data) => data.receiveItem.purchase.supplier.nama);
  };

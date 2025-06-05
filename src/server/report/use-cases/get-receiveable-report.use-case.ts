import { type ReceiveableReportQuery } from "@/model";
import { groupBy } from "lodash";

import { type SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";

export const getReceiveableReportUseCase =
  (repo: SalesInvoiceRepository) => async (q: ReceiveableReportQuery) => {
    const { data } = await repo.get({ ...q, limit: 100000, page: 1 });
    return groupBy(data, (data) => data.customer.nama);
  };

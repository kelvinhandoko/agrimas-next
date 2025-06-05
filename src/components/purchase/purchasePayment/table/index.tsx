import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import React from "react";

import DataTable from "@/components/common/table/DataTable";
import { salesInvoicePaymentColumn } from "@/components/sale/salePayment/table/columns";

const SalesPaymentTable = () => {
  const searchparams = useSearchParams();
  const invoiceId = searchparams.get("salesInvoiceId") ?? "";
  const { data, isLoading } = api.salesPayment.get.useQuery(
    {
      salesInvoiceId: invoiceId,
    },
    {
      enabled: !!invoiceId,
    },
  );
  const payments = data?.data ?? [];
  return (
    <DataTable
      columns={salesInvoicePaymentColumn()}
      data={payments}
      buttonNew={false}
      totalPage={data?.meta.pageCount ?? 1}
      withNumber={true}
      searchAble={false}
      titleTable="tabel pembayaran faktur penjualan"
    />
  );
};

export default SalesPaymentTable;

import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import React from "react";

import DataTable from "@/components/common/table/DataTable";
import { salesInvoicePaymentColumn } from "@/components/sale/salePayment/table/columns";

const PurchasePaymentTable = () => {
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
      totalPage={data?.meta.pageCount ?? 1}
      totalData={data?.meta.totalCount}
      withNumber={true}
      isLoading={isLoading}
      searchAble={false}
      titleTable="tabel pembayaran faktur penjualan"
    />
  );
};

export default PurchasePaymentTable;

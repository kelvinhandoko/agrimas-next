import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import React, { type FC } from "react";

import DataTable from "@/components/common/table/DataTable";
import { purchaseInvoicePaymentColumn } from "@/components/purchase/purchasePayment/table/columns";

interface PurchasePaymentTableProps {
  purchaseId?: string;
}

const PurchasePaymentTable: FC<PurchasePaymentTableProps> = ({
  purchaseId,
}) => {
  const searchparams = useSearchParams();
  const invoiceId = purchaseId ?? searchparams.get("purchaseInvoiceId") ?? "";
  const { data, isLoading } = api.purchasePayment.get.useQuery(
    {
      purchaseInvoiceId: invoiceId,
    },
    {
      enabled: !!invoiceId,
    },
  );
  const payments = data?.data ?? [];
  return (
    <DataTable
      columns={purchaseInvoicePaymentColumn()}
      data={payments}
      totalPage={data?.meta.pageCount ?? 1}
      totalData={data?.meta.totalCount}
      withNumber={true}
      isLoading={isLoading}
      searchAble={false}
      titleTable="tabel pembayaran faktur pembelian"
    />
  );
};

export default PurchasePaymentTable;

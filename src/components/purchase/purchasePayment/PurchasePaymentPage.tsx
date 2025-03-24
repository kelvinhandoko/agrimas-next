"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { PurchasePayment, purchasePaymentColumn } from "./Column";

const purchasePayments: PurchasePayment[] = [
  {
    noPurchasePayment: "PP-001",
    noPurchaseFaktur: "F-1001",
    date: "2025-03-21",
    supplier: "PT Sumber Berkah",
    totalBill: 500000,
    amount: 300000,
    amountDue: 200000,
  },
  {
    noPurchasePayment: "PP-002",
    noPurchaseFaktur: "F-1001",
    date: "2025-03-22",
    supplier: "PT Sumber Berkah",
    totalBill: 500000,
    amount: 200000,
    amountDue: 0,
  },
  {
    noPurchasePayment: "PP-003",
    noPurchaseFaktur: "F-1002",
    date: "2025-03-22",
    supplier: "CV Mitra Sejahtera",
    totalBill: 750000,
    amount: 500000,
    amountDue: 250000,
  },
  {
    noPurchasePayment: "PP-004",
    noPurchaseFaktur: "F-1002",
    date: "2025-03-23",
    supplier: "CV Mitra Sejahtera",
    totalBill: 750000,
    amount: 250000,
    amountDue: 0,
  },
];

const PurchasePaymentPage = () => {
  // const { data, isLoading } = api.supplier.getAll.useQuery({});
  // if (isLoading) {
  //   return <LoadingIndicator />;
  // }
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.root} />
      </Box>
      <DataTable
        columns={purchasePaymentColumn()}
        data={purchasePayments || []}
        path={paths.purchase.purchasePayment.new}
        searchAble
        searchPlaceholder="cari no pembayaran pembelian"
        buttonAddName="Tambah Pembayaran Pembelian"
        titleTable="Data Pembayaran Pembelian"
      />
    </Box>
  );
};

export default PurchasePaymentPage;

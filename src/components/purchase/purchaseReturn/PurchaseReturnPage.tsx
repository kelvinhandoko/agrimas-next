"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { type PurchaseReturn, purchaseReturnColumn } from "./Column";

const purchaseReceivedData: PurchaseReturn[] = [
  {
    noPurchaseReturn: "PR-001",
    noPurchaseOrder: "PO-1001",
    date: "2025-03-21",
    supplier: "PT Sumber Berkah",
    totalItem: 10,
  },
  {
    noPurchaseReturn: "PR-002",
    noPurchaseOrder: "PO-1001",
    date: "2025-03-22",
    supplier: "PT Sumber Berkah",
    totalItem: 5,
  },
  {
    noPurchaseReturn: "PR-003",
    noPurchaseOrder: "PO-1002",
    date: "2025-03-22",
    supplier: "CV Mitra Sejahtera",
    totalItem: 15,
  },
  {
    noPurchaseReturn: "PR-004",
    noPurchaseOrder: "PO-1003",
    date: "2025-03-23",
    supplier: "UD Cahaya Abadi",
    totalItem: 20,
  },
];

const PurchaseReturnPage = () => {
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
        columns={purchaseReturnColumn()}
        data={purchaseReceivedData || []}
        path={paths.purchase.purchaseReturn.new}
        searchAble
        searchPlaceholder="cari no pengembalian pembelian"
        buttonAddName="Tambah Pengembalian Pembelian"
        titleTable="Data Pengembalian Pembelian"
      />
    </Box>
  );
};

export default PurchaseReturnPage;

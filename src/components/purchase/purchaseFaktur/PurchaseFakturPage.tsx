"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { purchaseFakturColumn } from "./Column";

const dummyData = [
  {
    noPurchaseFaktur: "PF-0001",
    noPurchaseOrder: "PO-0002",
    date: "16/12/2024",
    supplier: "supplier 1",
    status: "paid",
  },
  {
    noPurchaseFaktur: "PF-0002",
    noPurchaseOrder: "PO-00010",
    date: "16/12/2024",
    supplier: "supplier 100",
    status: "unpaid",
  },
];

const PurchaseFakturPage = () => {
  //   const { data, isLoading } = api.supplier.getAll.useQuery({});
  //   if (isLoading) {
  //     return <LoadingIndicator />;
  //   }
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.root} />
      </Box>
      <DataTable
        columns={purchaseFakturColumn()}
        data={dummyData || []}
        path={paths.purchase.purchaseFaktur.new}
        searchAble
        searchPlaceholder="cari no faktur pembelian"
        buttonAddName="Tambah Faktur Pembelian"
        titleTable="Data Faktur Pembelian"
      />
    </Box>
  );
};

export default PurchaseFakturPage;

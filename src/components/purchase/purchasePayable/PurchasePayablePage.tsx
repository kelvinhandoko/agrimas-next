"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { purchasePayableColumn } from "./Column";

const dummyData = [
  {
    noPurchaseFaktur: "PF-0001",
    dueDate: "16/12/2024",
    supplier: "supplier 1",
    totalBill: 1200000,
    totalAmount: 1000000,
    dueAmount: 200000,
    status: "unpaid",
  },
  {
    noPurchaseFaktur: "PF-0002",
    dueDate: "16/12/2024",
    supplier: "supplier 1",
    totalBill: 2000000,
    totalAmount: 2000000,
    dueAmount: 0,
    status: "paid",
  },
];

const PurchasePayablePage = () => {
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
        columns={purchasePayableColumn()}
        data={dummyData || []}
        searchAble
        searchPlaceholder="cari no faktur pembelian"
        buttonNew={false}
        titleTable="Data Hutang Usaha"
      />
    </Box>
  );
};

export default PurchasePayablePage;

"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { purchaseOrderColumn } from "./Column";

const PurchaseOrderPage = () => {
  const { data, isLoading } = api.purchase.getAll.useQuery({});
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.root} />
      </Box>
      <DataTable
        columns={purchaseOrderColumn()}
        data={data?.data ?? []}
        path={paths.purchase.purchaseOrder.new}
        searchAble
        searchPlaceholder="cari no pesanan pembelian"
        buttonAddName="Tambah Pesanan Pembelian"
        titleTable="Data Pesanan Pembelian"
      />
    </Box>
  );
};

export default PurchaseOrderPage;

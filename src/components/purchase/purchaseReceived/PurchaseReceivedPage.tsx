"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";
import { supplierlColumn } from "@/components/dataMaster/dataMasterList/supplier/Column";

import { purchaseReceivedColumn } from "./Column";

const PurchaseReceivedPage = () => {
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
        columns={purchaseReceivedColumn()}
        data={[]}
        path={paths.purchase.purchaseReceived.new}
        searchAble
        searchPlaceholder="cari no penerimaan pembelian"
        buttonAddName="Tambah Penerimaan Pembelian"
        titleTable="Data Penerimaan Pembelian"
      />
    </Box>
  );
};

export default PurchaseReceivedPage;

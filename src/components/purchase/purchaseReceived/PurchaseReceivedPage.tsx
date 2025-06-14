"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";
import { purchaseReceivedColumn } from "@/components/purchase/purchaseReceived/Column";

const PurchaseReceivedPage = () => {
  const searchparams = useSearchParams();
  const page = Number(searchparams.get("page") ?? 1);
  const limit = Number(searchparams.get("limit") ?? 10);
  const search = searchparams.get("search") ?? "";
  const { data, isLoading } = api.receiveItem.get.useQuery({
    page,
    limit,
    search,
  });
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.root} />
      </Box>
      <DataTable
        columns={purchaseReceivedColumn()}
        data={data?.data ?? []}
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

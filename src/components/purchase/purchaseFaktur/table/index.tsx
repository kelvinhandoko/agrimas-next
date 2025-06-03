"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import React from "react";

import BackButton from "@/components/BackButton";
import DataTable from "@/components/common/table/DataTable";
import PurchaseInvoiceColumn from "@/components/purchase/purchaseFaktur/table/Column";

const PurchaseInvoiceTable = () => {
  const searchparams = useSearchParams();
  const page = Number(searchparams.get("page") ?? 1);
  const limit = Number(searchparams.get("limit") ?? 10);
  const search = searchparams.get("search") ?? "";
  const { data, isLoading } = api.purchaseInvoice.get.useQuery({
    page,
    limit,
    search,
  });
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.root} />
      </Box>
      <DataTable
        columns={PurchaseInvoiceColumn()}
        data={data?.data ?? []}
        path={paths.purchase.purchaseFaktur.new}
        searchAble
        isLoading={isLoading}
        totalData={data?.meta.totalCount ?? 0}
        totalPage={data?.meta.pageCount ?? 0}
        searchPlaceholder="cari no faktur pembelian"
        buttonAddName="Tambah faktur pembelian"
        titleTable="Data faktur pembelian"
      />
    </Box>
  );
};

export default PurchaseInvoiceTable;

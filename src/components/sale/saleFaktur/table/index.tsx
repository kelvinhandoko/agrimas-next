"use client";

import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";

import DataTable from "@/components/common/table/DataTable";
import SalesInvoiceColumn from "@/components/sale/saleFaktur/table/columns";

export const SalesInvoiceTable = () => {
  const searchparams = useSearchParams();
  const page = Number(searchparams.get("page") ?? 1);
  const limit = Number(searchparams.get("limit") ?? 10);
  const search = searchparams.get("search") ?? "";
  const { data, isLoading } = api.salesInvoice.get.useQuery({
    page,
    limit,
    search,
  });
  return (
    <DataTable
      data={data?.data ?? []}
      path="/sale/sale-faktur/new"
      titleTable="faktur penjualan"
      columns={SalesInvoiceColumn()}
      isLoading={isLoading}
    />
  );
};

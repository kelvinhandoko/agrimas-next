"use client";

import { api } from "@/trpc/react";
import { type FC } from "react";

import DataTable from "@/components/common/table/DataTable";
import SalesInvoiceColumn from "@/components/sale/saleFaktur/table/columns";

interface IProps {
  searchparams: Record<string, string | undefined>;
}

export const SalesInvoiceTable: FC<IProps> = ({ searchparams }) => {
  const page = Number(searchparams.page ?? 1);
  const limit = Number(searchparams.limit ?? 10);
  const search = searchparams.search ?? "";
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

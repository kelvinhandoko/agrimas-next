"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { predefinedRanges } from "@/utils/dateHelper";
import { useSearchParams } from "next/navigation";
import React from "react";

import DataTable from "@/components/common/table/DataTable";
import { SalesReturnColumns } from "@/components/sale/saleReturn/table/column";

const SalesReturnTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const customerId = searchParams.get("customerId") ?? "";
  const limit = Number(searchParams.get("limit") ?? 10);
  const page = Number(searchParams.get("page") ?? 1);
  const dateRange = {
    from: searchParams.get("from") || predefinedRanges.thisMonth.from.toISO()!,
    to: searchParams.get("to") || predefinedRanges.thisMonth.to.toISO()!,
  };

  const { data, isLoading } = api.invoiceReturn.get.useQuery({
    dateRange,
    limit,
    page,
    customerId,
    search,
  });
  const salesReturn = data?.data ?? [];
  return (
    <DataTable
      columns={SalesReturnColumns()}
      data={salesReturn}
      isLoading={isLoading}
      totalData={data?.meta.totalCount}
      totalPage={data?.meta.pageCount}
      titleTable="Data Retur Penjualan"
      path={paths.sale.saleReturn.new}
    />
  );
};

export default SalesReturnTable;

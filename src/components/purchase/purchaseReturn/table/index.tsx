"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { predefinedRanges } from "@/utils/dateHelper";
import { useSearchParams } from "next/navigation";
import React from "react";

import DataTable from "@/components/common/table/DataTable";
import { PurchaseReturnColumns } from "@/components/purchase/purchaseReturn/table/column";

const PurchaseReturnTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const supplierId = searchParams.get("supplierId") ?? "";
  const limit = Number(searchParams.get("limit") ?? 10);
  const page = Number(searchParams.get("page") ?? 1);
  const dateRange = {
    from: searchParams.get("from") || predefinedRanges.thisMonth.from.toISO()!,
    to: searchParams.get("to") || predefinedRanges.thisMonth.to.toISO()!,
  };

  const { data, isLoading } = api.purchaseReturn.get.useQuery({
    dateRange,
    limit,
    page,
    supplierId,
    search,
  });
  const purchaseReturns = data?.data ?? [];
  return (
    <DataTable
      columns={PurchaseReturnColumns()}
      data={purchaseReturns}
      isLoading={isLoading}
      totalData={data?.meta.totalCount}
      totalPage={data?.meta.pageCount}
      titleTable="Data Retur Pembelian"
      path={paths.purchase.purchaseReturn.new}
    />
  );
};

export default PurchaseReturnTable;

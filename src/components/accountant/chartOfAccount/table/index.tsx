"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";

import ChartOfAccountColumn from "@/components/accountant/chartOfAccount/table/columns";
import DataTable from "@/components/common/table/DataTable";

const ChartOfAccountTable = () => {
  const searchparams = useSearchParams();
  const search = searchparams.get("search") ?? "";
  const limit = Number(searchparams.get("limit")) || 10;
  const page = Number(searchparams.get("page")) || 1;
  const { data, isLoading } = api.account.get.useQuery({
    limit,
    page,
    search,
  });
  return (
    <DataTable
      columns={ChartOfAccountColumn()}
      data={data?.data ?? []}
      searchAble
      buttonAddName="Tambah Jurnal Umum"
      titleTable="Data Jurnal Umum"
    />
  );
};

export default ChartOfAccountTable;

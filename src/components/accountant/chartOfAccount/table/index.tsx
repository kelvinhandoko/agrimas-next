"use client";

import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";

import DialogWrapper from "@/components/DialogWrapper";
import AccountForm from "@/components/accountant/chartOfAccount/form";
import ChartOfAccountColumn from "@/components/accountant/chartOfAccount/table/columns";
import DataTable from "@/components/common/table/DataTable";

const ChartOfAccountTable = () => {
  const searchparams = useSearchParams();
  const search = searchparams.get("search") ?? "";
  const limit = Number(searchparams.get("limit")) || 10;
  const page = Number(searchparams.get("page")) || 1;
  const debounceSearch = useDebounce(search, 500);
  const [open, setOpen] = useState(false);
  const { data, isLoading } = api.account.get.useQuery({
    limit,
    page,
    search: debounceSearch,
  });
  return (
    <>
      <DataTable
        columns={ChartOfAccountColumn()}
        data={data?.data ?? []}
        isLoading={isLoading}
        totalData={data?.meta.totalCount ?? 0}
        totalPage={data?.meta.pageCount ?? 0}
        searchAble
        onAddNew={() => setOpen(true)}
        buttonAddName="Tambah akun baru"
        titleTable="Data nama akun"
      />
      <DialogWrapper
        open={open}
        onOpenChange={setOpen}
        title="Tambah akun baru"
      >
        <AccountForm onClose={() => setOpen(false)} />
      </DialogWrapper>
    </>
  );
};

export default ChartOfAccountTable;

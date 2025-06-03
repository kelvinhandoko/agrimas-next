"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import BackButton from "@/components/BackButton";
import DialogWrapper from "@/components/DialogWrapper";
import AccountForm from "@/components/accountant/chartOfAccount/form";
import ChartOfAccountColumn from "@/components/accountant/chartOfAccount/table/columns";
import DataTable from "@/components/common/table/DataTable";

const ChartOfAccountTable = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const search = searchParams.get("search") ?? "";
  const groupAccountId = searchParams.get("groupAccountId") ?? "";
  const [open, setOpen] = useState(false);
  const { data, isLoading } = api.account.get.useQuery({
    page,
    limit,
    search,
    groupAccountId,
  });
  return (
    <>
      <Box>
        <Box className="mb-8">
          <BackButton path={paths.accountant.root} />
        </Box>
        <DataTable
          columns={ChartOfAccountColumn()}
          data={data?.data ?? []}
          onAddNew={() => setOpen(true)}
          searchAble
          isLoading={isLoading}
          totalData={data?.meta.totalCount ?? 0}
          totalPage={data?.meta.pageCount ?? 0}
          searchPlaceholder="cari akun"
          buttonAddName="Tambah akun"
          titleTable="Daftar akun"
        />
      </Box>
      <DialogWrapper
        className="w-xl"
        title="form nama akun"
        open={open}
        onOpenChange={setOpen}
      >
        <AccountForm onClose={() => setOpen(false)} />
      </DialogWrapper>
    </>
  );
};

export default ChartOfAccountTable;

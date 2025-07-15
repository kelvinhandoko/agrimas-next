"use client";

import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";

import DialogWrapper from "@/components/DialogWrapper";
import DataTable from "@/components/common/table/DataTable";
import PaymentMethodForm from "@/components/finance/paymentMethod/form";
import { PaymentMethodColumn } from "@/components/finance/paymentMethod/table/Column";

const PaymentMethodTable = () => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit") ?? "10");
  const page = Number(searchParams.get("page") ?? "1");
  const search = searchParams.get("search") ?? "";
  const debounceSearch = useDebounce(search, 500);
  const { data, isLoading } = api.paymentMethod.get.useQuery({
    limit,
    page,
    search: debounceSearch,
  });
  return (
    <>
      <DataTable
        titleTable="tabel metode pembayaran"
        data={data?.data ?? []}
        totalData={data?.meta.totalCount ?? 0}
        totalPage={data?.meta.pageCount}
        columns={PaymentMethodColumn()}
        isLoading={isLoading}
        onAddNew={() => setOpen(true)}
      />
      <DialogWrapper
        title="tambah metode pembayaran"
        open={open}
        onOpenChange={setOpen}
      >
        <PaymentMethodForm onClose={() => setOpen(false)} />
      </DialogWrapper>
    </>
  );
};

export default PaymentMethodTable;

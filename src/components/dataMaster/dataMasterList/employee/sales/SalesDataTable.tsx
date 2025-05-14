"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { salesColumn } from "./Column";

const SalesDataTable = () => {
  const searchparams = useSearchParams();
  const search = searchparams.get("search") ?? "";
  const limit = Number(searchparams.get("limit") ?? 10);
  const page = Number(searchparams.get("page") ?? 1);

  const utils = api.useUtils();

  const { data, isLoading } = api.salesPerson.findAll.useQuery({
    limit,
    page,
    search,
  });

  const { mutateAsync: deleteSales } = api.salesPerson.delete.useMutation({
    onSuccess: async () => {
      toast.success("Berhasil hapus sales");
      await utils.salesPerson.findAll.invalidate();
    },
    onError: () => {
      toast.error("Gagal menghapus sales");
    },
  });

  const handleDeleteSales = async (id: string) => {
    try {
      await deleteSales(id);
    } catch (error) {
      console.error("Error deleting sales:", error);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <DataTable
      columns={salesColumn({ handleDeleteSales })}
      data={data?.data ?? []}
      path={paths.dataMaster.employee.newSales}
      buttonAddName="Tambah Sales"
      titleTable="Data Sales"
    />
  );
};

export default SalesDataTable;

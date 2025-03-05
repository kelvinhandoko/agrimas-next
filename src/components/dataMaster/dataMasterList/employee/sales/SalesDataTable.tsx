"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { toast } from "sonner";

import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { salesColumn } from "./Column";

const SalesDataTable = () => {
  const utils = api.useUtils();

  const { data, isLoading } = api.sales.findAll.useQuery();

  const { mutateAsync: deleteSales } = api.user.delete.useMutation({
    onSuccess: async () => {
      toast.success("Berhasil hapus sales");
      await utils.user.getAll.invalidate();
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
      data={data?.[0] || []}
      path={paths.dataMaster.employee.newSales}
      buttonAddName="Tambah Sales"
      titleTable="Data Sales"
    />
  );
};

export default SalesDataTable;

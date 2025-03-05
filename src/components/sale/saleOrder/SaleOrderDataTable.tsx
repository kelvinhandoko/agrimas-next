"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { toast } from "sonner";

import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";
import { userColumn } from "@/components/dataMaster/dataMasterList/employee/user/Column";

const SaleOrderDataTable = () => {
  const utils = api.useUtils();
  const { data, isLoading } = api.user.getAll.useQuery({});

  const { mutateAsync: deleteUser } = api.user.delete.useMutation({
    onSuccess: async () => {
      toast.success("Berhasil hapus pesanan penjualan");
      await utils.user.getAll.invalidate();
    },
    onError: () => {
      toast.error("Gagal menghapus pesanan penjualan");
    },
  });

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error deleting pesanan penjualan:", error);
    }
  };
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <DataTable
      columns={userColumn({ handleDeleteUser })}
      data={data?.data ?? []}
      colFilterName="username"
      path={paths.sale.saleOrder.new}
      titleTable="Data Pesanan Penjualan"
      buttonAddName="Tambah Pesanan Penjualan"
    />
  );
};

export default SaleOrderDataTable;

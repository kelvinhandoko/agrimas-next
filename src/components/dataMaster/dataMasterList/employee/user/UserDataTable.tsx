"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { toast } from "sonner";

import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { userlColumn } from "./Column";

const UserDataTable = () => {
  const utils = api.useUtils();
  const { data, isLoading } = api.user.getAll.useQuery({});

  const { mutateAsync: deleteUser } = api.user.delete.useMutation({
    onSuccess: async () => {
      toast.success("Berhasil hapus user");
      await utils.user.getAll.invalidate();
    },
    onError: () => {
      toast.error("Gagal menghapus user");
    },
  });

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <DataTable
      columns={userlColumn(handleDeleteUser)}
      data={data?.data || []}
      colFilterName="username"
      path={paths.dataMaster.employee.newUser}
      buttonAddName="Tambah User"
    />
  );
};

export default UserDataTable;

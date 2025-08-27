"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";
import { userColumn } from "@/components/dataMaster/dataMasterList/employee/user/Column";

const UserDataTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const limit = Number(searchParams.get("limit") ?? 10);
  const page = Number(searchParams.get("page") ?? 1);
  const utils = api.useUtils();
  const { data, isLoading } = api.user.getAll.useQuery({
    search,
    page,
    limit,
  });

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
    <>
      <DataTable
        columns={userColumn({ handleDeleteUser })}
        data={data?.data ?? []}
        searchAble
        // hideColumn={["role"]}
        path={paths.dataMaster.employee.newUser}
        buttonAddName="Tambah User"
        titleTable="Data User"
      />
    </>
  );
};

export default UserDataTable;

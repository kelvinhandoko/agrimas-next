"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { toast } from "sonner";

import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { journalColumn } from "./Column";

const JournalDataTable = () => {
  const { data, isLoading } = api.journal.getAll.useQuery({});
  const utils = api.useUtils();

  const { mutateAsync: deleteUser } = api.user.delete.useMutation({
    onSuccess: async () => {
      toast.success("Berhasil hapus user");
      await utils.user.getAll.invalidate();
    },
    onError: () => {
      toast.error("Gagal menghapus user");
    },
  });

  const handleDeleteJournal = async (id: string) => {
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
      columns={journalColumn({ handleDeleteJournal })}
      data={data?.data ?? []}
      searchAble
      path={paths.accountant.newJournal}
      buttonAddName="Tambah Jurnal Umum"
      titleTable="Data Jurnal Umum"
    />
  );
};

export default JournalDataTable;

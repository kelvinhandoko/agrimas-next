"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";

import BackButton from "@/components/BackButton";
import JournalColumn from "@/components/accountant/journal/table/columns";
import DataTable from "@/components/common/table/DataTable";

const JournalTable = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const search = searchParams.get("search") ?? "";
  const accountId = searchParams.get("accountId") ?? "";
  const { data, isLoading } = api.journal.get.useQuery({
    page,
    limit,
    search,
    accountId,
  });
  return (
    <>
      <Box>
        <Box className="mb-8">
          <BackButton path={paths.accountant.root} />
        </Box>
        <DataTable
          columns={JournalColumn()}
          data={data?.data ?? []}
          path={paths.accountant.newJournal}
          searchAble
          isLoading={isLoading}
          totalData={data?.meta.totalCount ?? 0}
          totalPage={data?.meta.pageCount ?? 0}
          searchPlaceholder="cari jurnal"
          buttonAddName="tambah jurnal umum"
          titleTable="Daftar jurnal umum"
        />
      </Box>
    </>
  );
};

export default JournalTable;

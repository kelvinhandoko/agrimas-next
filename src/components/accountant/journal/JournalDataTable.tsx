"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { predefinedRanges } from "@/utils/dateHelper";
import { type FC } from "react";

import DataTable from "@/components/common/table/DataTable";

import { JournalColumn } from "./Column";

interface IProps {
  searchparams: Record<string, string | undefined>;
}

const JournalDataTable: FC<IProps> = ({ searchparams }) => {
  const search = searchparams.search;
  const limit = Number(searchparams.limit) || 10;
  const page = Number(searchparams.page) || 1;

  const dateRange = {
    from: searchparams.from || predefinedRanges.thisMonth.from.toISO()!,
    to: searchparams.to || predefinedRanges.thisMonth.to.toISO()!,
  };

  const { data, isLoading } = api.journal.get.useQuery({
    dateRange,
    limit,
    page,
    search,
  });

  return (
    <DataTable
      columns={JournalColumn()}
      data={data?.data ?? []}
      searchAble
      path={paths.accountant.newJournal}
      isLoading={isLoading}
      totalData={data?.meta.totalCount}
      totalPage={data?.meta.pageCount}
      buttonAddName="Tambah Jurnal Umum"
      titleTable="Data Jurnal Umum"
    />
  );
};

export default JournalDataTable;

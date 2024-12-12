"use client";

import { api } from "@/trpc/react";
import React from "react";

import DataTable from "@/components/common/table/DataTable";
import { journalColumn } from "@/components/journal/table/JournalColumn";

const JournalList = () => {
  const { data, isLoading } = api.journal.getAll.useQuery({});
  return (
    <DataTable
      data={data?.data ?? []}
      columns={journalColumn}
      isLoading={isLoading}
    />
  );
};

export default JournalList;

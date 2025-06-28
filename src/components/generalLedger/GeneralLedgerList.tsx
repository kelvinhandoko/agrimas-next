"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { type FC } from "react";

import BackButton from "@/components/BackButton";
import DataTable from "@/components/common/table/DataTable";
import AccountFilter from "@/components/filter/AccountFilter";
import { GeneralLedgerColumn } from "@/components/generalLedger/table/Column";

interface GeneralLedgerListProps {
  params: Record<string, string | undefined>;
}

const GeneralLedgerList: FC<GeneralLedgerListProps> = ({ params }) => {
  const accountId = params.accountId;
  const page = Number(params.page) || 1;
  const { data, isLoading, isError } = api.generalLedger.get.useQuery({
    accountId,
    page,
  });
  return (
    <div>
      <BackButton path={paths.accountant.root} />
      <AccountFilter />
      <DataTable
        columns={GeneralLedgerColumn()}
        isError={isError}
        data={data?.data || []}
        isLoading={isLoading}
        titleTable="Data buku besar"
      />
    </div>
  );
};

export default GeneralLedgerList;

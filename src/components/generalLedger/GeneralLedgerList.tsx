"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { type FC } from "react";

import BackButton from "@/components/BackButton";
import DataTable from "@/components/common/table/DataTable";
import GeneralLedgerAccountInput from "@/components/generalLedger/GeneralLedgerAccountInput";
import { GeneralLedgerColumn } from "@/components/generalLedger/table/Column";

interface GeneralLedgerListProps {
  params: Record<string, string | undefined>;
}

const GeneralLedgerList: FC<GeneralLedgerListProps> = ({ params }) => {
  const p = useParams();
  const id = p.id;

  const page = Number(params.page) || 1;
  const { data, isLoading, isError } = api.generalLedger.get.useQuery({
    accountId: id as string,
    page,
  });
  return (
    <div>
      <div className="flex w-fit items-center justify-between gap-4">
        <BackButton path={paths.accountant.root} />
        <GeneralLedgerAccountInput />
      </div>
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

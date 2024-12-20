"use client";

import { api } from "@/trpc/react";
import { predefinedRanges } from "@/utils/dateHelper";
import { useSearchParams } from "next/navigation";
import React from "react";

const GeneralLedgerList = () => {
  const searchparams = useSearchParams();
  const from =
    searchparams.get("from") ?? predefinedRanges.thisMonth.from.toISO()!;
  const to = searchparams.get("to") ?? predefinedRanges.thisMonth.to.toISO()!;
  const { data, isLoading } = api.journalDetail.getAllByAccountId.useQuery({
    from,
    to,
  });
  console.log(data?.data);
  return <div>generalLedgerList</div>;
};

export default GeneralLedgerList;

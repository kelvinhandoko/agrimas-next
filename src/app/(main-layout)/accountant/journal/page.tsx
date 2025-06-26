import { HydrateClient, api } from "@/trpc/server";
import { predefinedRanges } from "@/utils/dateHelper";
import React from "react";

import JournalDataTable from "@/components/accountant/journal/JournalDataTable";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const from = params.from;
  const to = params.to;

  const dateRange = {
    from: from || predefinedRanges.thisMonth.from.toISO()!,
    to: to || predefinedRanges.thisMonth.to.toISO()!,
  };

  const search = params.search;
  const limit = Number(params.limit) || 10;
  const page = Number(params.page) || 1;
  await api.journal.get.prefetch({
    dateRange,
    search,
    limit,
    page,
  });
  return (
    <HydrateClient>
      <JournalDataTable searchparams={params} />
    </HydrateClient>
  );
};

export default page;

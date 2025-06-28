import { HydrateClient, api } from "@/trpc/server";
import React from "react";

import GeneralLedgerList from "@/components/generalLedger/GeneralLedgerList";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const from = params.from;
  const to = params.to;

  const dateRange =
    from && to
      ? {
          from: from,
          to: to,
        }
      : undefined;

  const search = params.search;
  const limit = Number(params.limit) || 10;
  const page = Number(params.page) || 1;
  const accountId = params.accountId;
  await api.generalLedger.get.prefetch({
    dateRange,
    search,
    limit,
    accountId,
    page,
  });
  return (
    <HydrateClient>
      <GeneralLedgerList params={params} />
    </HydrateClient>
  );
};

export default page;

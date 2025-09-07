import { HydrateClient, api } from "@/trpc/server";
import React from "react";

import GeneralLedgerList from "@/components/generalLedger/GeneralLedgerList";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
  params: Promise<{ id: string }>;
}

const page = async ({ searchParams, params }: PageProps) => {
  const resolveParams = await searchParams;
  const id = (await params).id;
  const from = resolveParams.from;
  const to = resolveParams.to;

  const dateRange =
    from && to
      ? {
          from: from,
          to: to,
        }
      : undefined;

  const search = resolveParams.search;
  const limit = Number(resolveParams.limit) || 10;
  const page = Number(resolveParams.page) || 1;
  await api.generalLedger.get.prefetch({
    dateRange,
    search,
    limit,
    accountId: id,
    page,
  });
  return (
    <HydrateClient>
      <GeneralLedgerList params={resolveParams} />
    </HydrateClient>
  );
};

export default page;

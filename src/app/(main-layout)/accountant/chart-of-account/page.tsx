import { HydrateClient, api } from "@/trpc/server";
import React from "react";

import ChartOfAccountTable from "@/components/accountant/chartOfAccount/table";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}
const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const limit = Number(params.limit) || 10;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  await api.account.get.prefetch({
    limit,
    page,
    search,
  });
  return (
    <HydrateClient>
      <ChartOfAccountTable />
    </HydrateClient>
  );
};

export default page;

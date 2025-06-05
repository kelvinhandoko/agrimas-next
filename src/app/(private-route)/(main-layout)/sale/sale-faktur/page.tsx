import { HydrateClient, api } from "@/trpc/server";
import React from "react";

import { SalesInvoiceTable } from "@/components/sale/saleFaktur/table";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const limit = Math.min(Number(params.limit ?? 10), 50); // cap at 50
  const page = Number(params.page ?? 1);
  const search = params.search ?? "";
  await api.salesInvoice.get.prefetch({ limit, page, search });
  return (
    <HydrateClient>
      <SalesInvoiceTable />
    </HydrateClient>
  );
};

export default page;

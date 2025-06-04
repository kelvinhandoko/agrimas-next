import { type PaginatedJournalQuery } from "@/model";
import { HydrateClient, api } from "@/trpc/server";
import React from "react";

import JournalTable from "@/components/accountant/journal/table";

interface PageProps {
  searchParams: Promise<Partial<PaginatedJournalQuery>>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  await api.journal.get.prefetch(params);
  return (
    <HydrateClient>
      <JournalTable />
    </HydrateClient>
  );
};

export default page;

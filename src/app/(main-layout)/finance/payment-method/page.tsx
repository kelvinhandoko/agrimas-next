import { HydrateClient, api } from "@/trpc/server";
import React from "react";

import PaymentMethodTable from "@/components/finance/paymentMethod/table";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const search = params?.search ?? "";
  const page = Number(params?.page ?? "1");
  const limit = Number(params?.limit ?? "10");
  await api.paymentMethod.get.prefetch({ search, page, limit });
  return (
    <HydrateClient>
      <PaymentMethodTable />
    </HydrateClient>
  );
};

export default page;

import { HydrateClient, api } from "@/trpc/server";
import React from "react";

import PaymentMethodTable from "@/components/finance/paymentMethod/table";

interface PageProps {
  searchparams: Promise<Record<string, string | undefined>>;
}

const page = async ({ searchparams }: PageProps) => {
  const params = await searchparams;
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

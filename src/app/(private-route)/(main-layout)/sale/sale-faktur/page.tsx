import { HydrateClient, api } from "@/trpc/server";
import React from "react";

import { SalesInvoiceTable } from "@/components/sale/saleFaktur/table";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

const page = async ({ searchParams }: PageProps) => {
  return <SalesInvoiceTable />;
};

export default page;

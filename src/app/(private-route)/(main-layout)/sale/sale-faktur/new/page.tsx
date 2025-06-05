import { HydrateClient, api } from "@/trpc/server";
import React from "react";

import SalesInvoiceForm from "@/components/sale/saleFaktur/form";

const page = async () => {
  await Promise.all([
    api.salesPerson.getInfinite.prefetchInfinite({}),
    api.customer.getInfinite.prefetchInfinite({}),
    api.product.getInfinite.prefetchInfinite({}),
  ]);
  return (
    <HydrateClient>
      <SalesInvoiceForm />
    </HydrateClient>
  );
};

export default page;

import { HydrateClient, api } from "@/trpc/server";
import React from "react";

import SalesInvoiceForm from "@/components/sale/saleFaktur/form";

const page = async () => {
  await Promise.all([
    api.salesPerson.getInfinite.prefetchInfinite({ limit: 10 }),
    api.customer.getInfinite.prefetchInfinite({ limit: 10 }),
    api.product.getInfinite.prefetchInfinite({ limit: 10 }),
  ]);
  return (
    <HydrateClient>
      <SalesInvoiceForm />
    </HydrateClient>
  );
};

export default page;

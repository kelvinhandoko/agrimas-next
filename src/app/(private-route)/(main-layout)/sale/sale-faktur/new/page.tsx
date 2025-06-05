import { HydrateClient, api } from "@/trpc/server";
import React from "react";

import SalesInvoiceForm from "@/components/sale/saleFaktur/form";

const page = async () => {
  return <SalesInvoiceForm />;
};

export default page;

import { HydrateClient, api } from "@/trpc/server";
import { type Metadata } from "next";
import React from "react";

import SupplierPage from "@/components/dataMaster/dataMasterList/supplier/SupplierPage";

export const metadata: Metadata = {
  title: "Agrimasi - Supplier Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = async () => {
  await api.supplier.getAll.prefetch({});
  return (
    <HydrateClient>
      <SupplierPage />
    </HydrateClient>
  );
};

export default page;

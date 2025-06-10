import { type Metadata } from "next";
import React from "react";

import SupplierPage from "@/components/dataMaster/dataMasterList/supplier/SupplierPage";

export const metadata: Metadata = {
  title: "Agrimasi - Supplier Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <SupplierPage />;
};

export default page;

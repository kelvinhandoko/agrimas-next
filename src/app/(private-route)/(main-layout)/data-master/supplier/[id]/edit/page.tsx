import { type Metadata } from "next";
import React from "react";

import EditSupplierPage from "@/components/dataMaster/dataMasterList/supplier/edit/editSupplierPage";

export const metadata: Metadata = {
  title: "Agrimasi - Edit Supplier Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <EditSupplierPage />;
};

export default page;

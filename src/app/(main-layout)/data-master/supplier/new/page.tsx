import { type Metadata } from "next";
import React from "react";

import AddNewSupplierPage from "@/components/dataMaster/dataMasterList/supplier/new/addNewSupplierPage";

export const metadata: Metadata = {
  title: "Agrimasi - Add New Supplier Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <AddNewSupplierPage />;
};

export default page;

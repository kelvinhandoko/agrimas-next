import { type Metadata } from "next";
import React from "react";

import AddNewCustomerPage from "@/components/dataMaster/dataMasterList/customer/new/addNewCustomerPage";

export const metadata: Metadata = {
  title: "Agrimasi - Add New Customer Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <AddNewCustomerPage />;
};

export default page;

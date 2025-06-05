import { type Metadata } from "next";
import React from "react";

import CustomerPage from "@/components/dataMaster/dataMasterList/customer/CustomerPage";

export const metadata: Metadata = {
  title: "Agrimas - Customer Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <CustomerPage />;
};

export default page;

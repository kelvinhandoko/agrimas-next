import { type Metadata } from "next";
import React from "react";

import AddNewSalesPage from "@/components/dataMaster/dataMasterList/employee/sales/new/AddNewSalesPage";

export const metadata: Metadata = {
  title: "Agrimas - Add Sales Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <AddNewSalesPage />;
};

export default page;

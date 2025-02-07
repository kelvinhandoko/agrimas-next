import { type Metadata } from "next";
import React from "react";

import EmployeePage from "@/components/dataMaster/dataMasterList/employee/EmployeePage";

export const metadata: Metadata = {
  title: "Agrimas - Employee Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <EmployeePage />;
};

export default page;

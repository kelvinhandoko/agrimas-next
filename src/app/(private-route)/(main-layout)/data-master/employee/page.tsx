import { type Metadata } from "next";
import React from "react";

import EmployeePage from "@/components/dataMaster/dataMasterList/employee/EmployeePage";

export const metadata: Metadata = {
  title: "Agrimas - Employee Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}
const page = ({ searchParams }: PageProps) => {
  return <EmployeePage searchParams={searchParams} />;
};

export default page;

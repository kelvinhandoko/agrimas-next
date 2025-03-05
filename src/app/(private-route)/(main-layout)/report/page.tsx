import { HydrateClient } from "@/trpc/server";
import { Metadata } from "next";
import React from "react";

import DataReportList from "@/components/report/DataReportList";

export const metadata: Metadata = {
  title: "Agrimas - Report Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return (
    <HydrateClient>
      <DataReportList />
    </HydrateClient>
  );
};

export default page;

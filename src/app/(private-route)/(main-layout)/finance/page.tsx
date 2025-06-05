import { HydrateClient } from "@/trpc/server";
import { type Metadata } from "next";
import React from "react";

import DataFinanceList from "@/components/finance/DataFinanceList";

export const metadata: Metadata = {
  title: "Agrimas - Finance Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return (
    <HydrateClient>
      <DataFinanceList />
    </HydrateClient>
  );
};

export default page;

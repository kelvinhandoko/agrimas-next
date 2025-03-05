import { HydrateClient } from "@/trpc/server";
import { type Metadata } from "next";
import React from "react";

import DataAccountantList from "@/components/accountant/DataAccountantList";

export const metadata: Metadata = {
  title: "Agrimas - Accountant Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return (
    <HydrateClient>
      <DataAccountantList />
    </HydrateClient>
  );
};

export default page;

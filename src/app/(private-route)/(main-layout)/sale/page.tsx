import { HydrateClient } from "@/trpc/server";
import { Metadata } from "next";

import DataSaleList from "@/components/sale/DataSaleList";

export const metadata: Metadata = {
  title: "Agrimas - Sale Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return (
    <HydrateClient>
      <DataSaleList />
    </HydrateClient>
  );
};

export default page;

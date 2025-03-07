import { HydrateClient } from "@/trpc/server";
import { type Metadata } from "next";

import DataPurchaseList from "@/components/purchase/DataPurchaseList";

export const metadata: Metadata = {
  title: "Agrimas - Purchase Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return (
    <HydrateClient>
      <DataPurchaseList />
    </HydrateClient>
  );
};

export default page;

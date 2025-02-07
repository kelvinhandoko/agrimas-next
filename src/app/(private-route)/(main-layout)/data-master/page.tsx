import { auth } from "@/server";
import { HydrateClient } from "@/trpc/server";
import { Metadata } from "next";

import DataMasterList from "@/components/dataMaster/dataMasterList/DataMasterList";

export const metadata: Metadata = {
  title: "Agrimas - Data Master Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default async function Home() {
  const session = await auth();
  console.log("session", session);

  return (
    <HydrateClient>
      <DataMasterList />
    </HydrateClient>
  );
}

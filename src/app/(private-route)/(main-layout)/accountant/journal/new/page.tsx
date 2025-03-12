import { Metadata } from "next";

import NewJournalPage from "@/components/accountant/journal/new/NewJournalPage";

export const metadata: Metadata = {
  title: "Agrimas - New Journal Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = () => {
  return <NewJournalPage />;
};

export default page;

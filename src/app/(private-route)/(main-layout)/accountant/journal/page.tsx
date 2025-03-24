import { type Metadata } from "next";

import JournalPage from "@/components/accountant/journal/JournalPage";

export const metadata: Metadata = {
  title: "Agrimas - Journal Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = () => {
  return <JournalPage />;
};

export default page;

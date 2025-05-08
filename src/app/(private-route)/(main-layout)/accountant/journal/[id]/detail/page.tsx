import { type Metadata } from "next";

import DetailJournalPage from "@/components/accountant/journal/detail/DetailJournalPage";

export const metadata: Metadata = {
  title: "Agrimas - Journal Detail Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface JournalDetailProps {
  params: Promise<{
    id: string;
  }>;
}
const page = async ({ params }: JournalDetailProps) => {
  return <DetailJournalPage id={(await params).id} />;
};

export default page;

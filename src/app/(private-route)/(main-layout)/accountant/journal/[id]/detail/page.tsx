import { type Metadata } from "next";

import DetailJournalPage from "@/components/accountant/journal/detail/DetailJournalPage";

export const metadata: Metadata = {
  title: "Agrimas - Journal Detail Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface JournalDetailProps {
  params: {
    id: string;
  };
}
const page = ({ params }: JournalDetailProps) => {
  return <DetailJournalPage id={params.id} />;
};

export default page;

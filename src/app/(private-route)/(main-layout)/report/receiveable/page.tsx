import { Metadata } from "next";

import ReceiveablePage from "@/components/report/receiveable/ReceiveablePage";

export const metadata: Metadata = {
  title: "Agrimas - Report Receiveable Customer Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <ReceiveablePage />;
};

export default page;

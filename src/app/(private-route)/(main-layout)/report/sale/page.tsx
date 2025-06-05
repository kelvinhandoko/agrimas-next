import { type Metadata } from "next";

import ReportSalePage from "@/components/report/sale/ReportSalePage";

export const metadata: Metadata = {
  title: "Agrimas - Report Sale Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <ReportSalePage />;
};

export default page;

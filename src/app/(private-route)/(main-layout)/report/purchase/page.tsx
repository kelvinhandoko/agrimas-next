import { Metadata } from "next";

import ReportPurchasePage from "@/components/report/purchase/ReportPurchasePage";

export const metadata: Metadata = {
  title: "Agrimas - Report Purchase Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = () => {
  return <ReportPurchasePage />;
};

export default page;

import { Metadata } from "next";

import PayablePage from "@/components/report/payable/PayablePage";

export const metadata: Metadata = {
  title: "Agrimas - Report Payable Supplier Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <PayablePage />;
};

export default page;

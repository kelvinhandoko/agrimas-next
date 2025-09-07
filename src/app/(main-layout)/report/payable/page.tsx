import { type Metadata } from "next";
import React from "react";

import PayablePageTemp from "@/components/report/payable/PayablePage";

export const metadata: Metadata = {
  title: "Agrimas - Report Payable Supplier Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return (
    <div>
      <PayablePageTemp />
    </div>
  );
};

export default page;

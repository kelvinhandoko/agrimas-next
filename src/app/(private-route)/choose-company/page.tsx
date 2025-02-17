import { type Metadata } from "next";
import React from "react";

import ChooseCompanyPage from "@/components/company/ChooseCompanyPage";

export const metadata: Metadata = {
  title: "Agrimas - Choose Company",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function page() {
  return <ChooseCompanyPage />;
}

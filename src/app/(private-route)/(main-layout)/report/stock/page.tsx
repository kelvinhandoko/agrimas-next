import { Metadata } from "next";

import StockPage from "@/components/report/stock/StockPage";

export const metadata: Metadata = {
  title: "Agrimas - Report Stock Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = () => {
  return <StockPage />;
};

export default page;

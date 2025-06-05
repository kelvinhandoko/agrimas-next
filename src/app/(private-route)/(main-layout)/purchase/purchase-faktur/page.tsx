import { Metadata } from "next";

import PurchaseFakturPage from "@/components/purchase/purchaseFaktur/PurchaseFakturPage";

export const metadata: Metadata = {
  title: "Agrimas - Purchase Faktur Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <PurchaseFakturPage />;
};

export default page;

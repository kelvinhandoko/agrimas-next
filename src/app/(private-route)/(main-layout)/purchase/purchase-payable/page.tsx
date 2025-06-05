import { Metadata } from "next";

import PurchasePayablePage from "@/components/purchase/purchasePayable/PurchasePayablePage";

export const metadata: Metadata = {
  title: "Agrimas - Purchase Payable Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <PurchasePayablePage />;
};

export default page;

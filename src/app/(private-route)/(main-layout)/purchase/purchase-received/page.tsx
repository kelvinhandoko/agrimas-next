import { Metadata } from "next";

import PurchaseReceivedPage from "@/components/purchase/purchaseReceived/PurchaseReceivedPage";

export const metadata: Metadata = {
  title: "Agrimas - Purchase Received Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <PurchaseReceivedPage />;
};

export default page;

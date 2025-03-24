import { Metadata } from "next";

import PurchasePaymentPage from "@/components/purchase/purchasePayment/PurchasePaymentPage";

export const metadata: Metadata = {
  title: "Agrimas - Purchase Payment Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <PurchasePaymentPage />;
};

export default page;

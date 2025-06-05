import { Metadata } from "next";

import PurchaseReturnPage from "@/components/purchase/purchaseReturn/PurchaseReturnPage";

export const metadata: Metadata = {
  title: "Agrimas - Purchase Return Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <PurchaseReturnPage />;
};

export default page;

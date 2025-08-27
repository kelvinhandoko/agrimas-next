import { type Metadata } from "next";

import PurchaseReturnTable from "@/components/purchase/purchaseReturn/table";

export const metadata: Metadata = {
  title: "Agrimas - Purchase Return Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <PurchaseReturnTable />;
};

export default page;

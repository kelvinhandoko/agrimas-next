import { Metadata } from "next";

import DetailPurcaseReceived from "@/components/purchase/purchaseReceived/detail/DetailPurchaseReceived";

export const metadata: Metadata = {
  title: "Agrimas - Detail Purchase Received Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = ({ params }: { params: { id: string } }) => {
  return <DetailPurcaseReceived id={params.id} />;
};

export default page;

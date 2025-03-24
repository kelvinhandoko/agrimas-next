import { Metadata } from "next";

import DetailPurchasePayment from "@/components/purchase/purchasePayment/detail/DetailPurchasePayment";

export const metadata: Metadata = {
  title: "Agrimas - Detail Purchase Payment Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = ({ params }: { params: { id: string } }) => {
  return <DetailPurchasePayment id={params.id} />;
};

export default page;

import { Metadata } from "next";

import DetailPurchaseOrderPage from "@/components/purchase/purchaseOrder/detail/DetailPurchaseOrderPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Purchase Order Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = ({ params }: { params: { id: string } }) => {
  return <DetailPurchaseOrderPage id={params.id} />;
};

export default page;

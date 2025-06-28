import { type Metadata } from "next";

import DetailPurchaseOrderPage from "@/components/purchase/purchaseOrder/detail/DetailPurchaseOrderPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Purchase Order Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
const page = async ({ params }: PageProps) => {
  const id = (await params).id;
  return <DetailPurchaseOrderPage id={id} />;
};

export default page;

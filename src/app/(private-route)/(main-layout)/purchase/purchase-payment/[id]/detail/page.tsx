import { Metadata } from "next";

import DetailPurchasePayment from "@/components/purchase/purchasePayment/detail/DetailPurchasePayment";

export const metadata: Metadata = {
  title: "Agrimas - Detail Purchase Payment Page",
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
  return <DetailPurchasePayment id={id} />;
};

export default page;

import { type Metadata } from "next";

import DetailSaleShippingPage from "@/components/sale/saleShipping/detail/DetailSaleShippingPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Sale Shipping Page",
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
  return <DetailSaleShippingPage id={id} />;
};

export default page;

import { type Metadata } from "next";

import DetailSaleShippingPage from "@/components/sale/saleShipping/detail/DetailSaleShippingPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Sale Shipping Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = ({ params }: { params: { id: string } }) => {
  return <DetailSaleShippingPage id={params.id} />;
};

export default page;

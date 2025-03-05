import { type Metadata } from "next";

import DetailSaleOrderPage from "@/components/sale/saleOrder/detail/DetailSaleOrderPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Sale Order Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = ({ params }: { params: { id: string } }) => {
  return <DetailSaleOrderPage id={params.id} />;
};

export default page;

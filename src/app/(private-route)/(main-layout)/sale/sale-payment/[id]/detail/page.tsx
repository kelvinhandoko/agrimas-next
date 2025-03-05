import { type Metadata } from "next";

import DetailSalePaymentPage from "@/components/sale/salePayment/detail/DetailSalePaymentPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Sale Payment Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = ({ params }: { params: { id: string } }) => {
  return <DetailSalePaymentPage id={params.id} />;
};

export default page;

import { Metadata } from "next";

import EditPurchaseReturnPage from "@/components/purchase/purchaseReturn/edit/EditPurchaseReturnPage";

export const metadata: Metadata = {
  title: "Agrimas - Edit Purchase Return Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = ({ params }: { params: { id: string } }) => {
  return <EditPurchaseReturnPage id={params.id} />;
};

export default page;

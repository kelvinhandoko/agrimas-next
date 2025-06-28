import { type Metadata } from "next";

import EditPurchaseReturnPage from "@/components/purchase/purchaseReturn/edit/EditPurchaseReturnPage";

export const metadata: Metadata = {
  title: "Agrimas - Edit Purchase Return Page",
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
  return <EditPurchaseReturnPage id={id} />;
};

export default page;

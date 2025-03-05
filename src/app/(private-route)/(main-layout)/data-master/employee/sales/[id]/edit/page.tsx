import { type Metadata } from "next";

import EditSalesPage from "@/components/dataMaster/dataMasterList/employee/sales/edit/EditSalesPage";

export const metadata: Metadata = {
  title: "Agrimas - Sales Edit Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = ({ params }: { params: { id: string } }) => {
  return <EditSalesPage id={params.id} />;
};

export default page;

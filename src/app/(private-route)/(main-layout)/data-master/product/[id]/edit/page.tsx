import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Agrimasi - Edit Product Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = ({ params }: { params: { id: string } }) => {
  return <div>Edit Product page {params.id}</div>;
};

export default page;

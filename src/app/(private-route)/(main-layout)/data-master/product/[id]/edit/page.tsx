import { type Metadata } from "next";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: "Agrimasi - Edit Product Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = async ({ params }: { params: Params }) => {
  const id = (await params).id;
  return <div>Edit Product page {id}</div>;
};

export default page;

import EditSupplierPage from "@/components/dataMaster/dataMasterList/supplier/edit/editSupplierPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
const page = async ({ params }: PageProps) => {
  const id = (await params).id;
  return <EditSupplierPage id={id} />;
};

export default page;

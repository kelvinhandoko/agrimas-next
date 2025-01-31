import EditSupplierPage from "@/components/dataMaster/dataMasterList/supplier/edit/editSupplierPage";

const page = ({ params }: { params: { id: string } }) => {
  return <EditSupplierPage id={params.id} />;
};

export default page;

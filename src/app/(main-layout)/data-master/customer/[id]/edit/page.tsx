import EditCustomerPage from "@/components/dataMaster/dataMasterList/customer/edit/editCustomerPage";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <EditCustomerPage id={id} />;
};

export default page;

import EditCustomerPage from "@/components/dataMaster/dataMasterList/customer/edit/editCustomerPage";

const page = ({ params }: { params: { id: string } }) => {
  return <EditCustomerPage id={params.id} />;
};

export default page;

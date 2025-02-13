"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { customerlColumn } from "./Column";

const CustomerPage = () => {
  const { data, isLoading } = api.customer.getAll.useQuery({});
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.root} />
      </Box>
      <DataTable
        columns={customerlColumn}
        data={data?.data || []}
        colFilterName="nama"
        path={paths.dataMaster.customer.new}
        buttonAddName="Tambah Customer"
        titleTable="Data Customer"
      />
    </Box>
  );
};

export default CustomerPage;

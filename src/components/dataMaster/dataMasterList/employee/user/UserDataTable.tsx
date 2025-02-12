"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";

import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { customerlColumn } from "../../customer/Column";

const UserDataTable = () => {
  const { data, isLoading } = api.supplier.getAll.useQuery({});
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <DataTable
      columns={customerlColumn}
      data={data?.data || []}
      colFilterName="nama"
      path={paths.dataMaster.employee.newUser}
      buttonAddName="Tambah User"
    />
  );
};

export default UserDataTable;

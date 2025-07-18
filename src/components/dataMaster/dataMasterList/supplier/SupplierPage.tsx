"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { supplierlColumn } from "./Column";

const SupplierPage = () => {
  const { data, isLoading } = api.supplier.getAll.useQuery({});
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.root} />
      </Box>
      <DataTable
        columns={supplierlColumn}
        data={data?.data ?? []}
        path={paths.dataMaster.supplier.new}
        buttonAddName="Tambah Supplier"
        titleTable="Data Supplier"
      />
    </Box>
  );
};

export default SupplierPage;

"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import DataTable from "@/components/common/table/DataTable";

import { journalColumn } from "./TableSupplier/Column";
import { DataTableDemo } from "./TableSupplier/table2";

const SupplierPage = () => {
  const { data, isLoading } = api.supplier.getAll.useQuery({});
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.root} />
      </Box>
      <DataTable
        columns={journalColumn}
        data={data?.data || []}
        colFilterName="nama"
        path={paths.dataMaster.supplier.new}
        buttonAddName="Tambah Supplier"
      />
      {/* <DataTableDemo /> */}
    </Box>
  );
};

export default SupplierPage;

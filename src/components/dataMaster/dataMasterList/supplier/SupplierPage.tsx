import { paths } from "@/paths/paths";
import { Box } from "@radix-ui/themes";
import Link from "next/link";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";

import { type Supplier, columns } from "./TableSupplier/Column";
import { DataTable } from "./TableSupplier/data-table";
import { DataTableDemo } from "./TableSupplier/table2";

async function getData(): Promise<Supplier[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      no: 1,
      name: "John",
      address: "pending",
    },
    {
      id: "728ed59f",
      no: 2,
      name: "Doe",
      address: "pending",
    },
    // ...
  ];
}

const SupplierPage = async () => {
  const data = await getData();
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.root} />
      </Box>
      {/* <DataTable columns={columns} data={data} /> */}
      <DataTableDemo />
    </Box>
  );
};

export default SupplierPage;

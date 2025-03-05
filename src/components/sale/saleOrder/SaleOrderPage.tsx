import { paths } from "@/paths/paths";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";

import SaleOrderDataTable from "./SaleOrderDataTable";

const SaleOrderPage = () => {
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.root} />
      </Box>
      <SaleOrderDataTable />
    </Box>
  );
};

export default SaleOrderPage;

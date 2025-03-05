import { paths } from "@/paths/paths";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";

import SaleShippingDataTable from "./SaleShippingDataTable";

const SaleShippingPage = () => {
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.sale.root} />
      </Box>
      <SaleShippingDataTable />
    </Box>
  );
};

export default SaleShippingPage;

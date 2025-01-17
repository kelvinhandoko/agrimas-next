import { paths } from "@/paths/paths";
import { Box } from "@radix-ui/themes";
import React from "react";

import BackButton from "@/components/BackButton";

const EditSupplierPage = () => {
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.supplier.root} />
      </Box>
      <h2>edit supplier page</h2>
    </Box>
  );
};

export default EditSupplierPage;

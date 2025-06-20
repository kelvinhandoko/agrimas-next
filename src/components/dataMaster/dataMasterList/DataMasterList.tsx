import { paths } from "@/paths/paths";
import { Grid } from "@radix-ui/themes";
import React from "react";
import { FiBriefcase, FiPackage, FiTruck, FiUsers } from "react-icons/fi";

import SectionCard from "@/components/SectionCard";

const listMenu = [
  {
    title: "Produk",
    icon: <FiPackage size={"50px"} />,
    path: paths.dataMaster.product.root,
  },
  {
    title: "Supplier",
    icon: <FiTruck size={"50px"} />,
    path: paths.dataMaster.supplier.root,
  },
  {
    title: "Customer",
    icon: <FiUsers size={"50px"} />,
    path: paths.dataMaster.customer.root,
  },
  {
    title: "Karyawan",
    icon: <FiBriefcase size={"50px"} />,
    path: paths.dataMaster.employee.root,
  },
];

const DataMasterList = () => {
  return (
    <Grid columns={{ sm: "2", md: "4" }} gap={"3"}>
      {listMenu.map((menu, index) => (
        <SectionCard index={index} menu={menu} key={index} />
      ))}
    </Grid>
  );
};

export default DataMasterList;

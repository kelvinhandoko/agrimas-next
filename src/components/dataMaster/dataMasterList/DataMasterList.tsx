import { paths } from "@/paths/paths";
import { Grid } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FiBriefcase, FiPackage, FiTruck, FiUsers } from "react-icons/fi";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
        <Link href={menu.path} key={index}>
          <Card
            className="flex h-[12rem] flex-col items-center justify-center rounded-sm text-gray-700 hover:shadow-lg hover:shadow-[#614de38c]"
            key={index}
          >
            <CardHeader>{menu.icon}</CardHeader>
            <CardTitle>{menu.title}</CardTitle>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

export default DataMasterList;

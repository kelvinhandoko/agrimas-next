import { paths } from "@/paths/paths";
import { Grid } from "@radix-ui/themes";
import Link from "next/link";
import {
  FiCornerUpLeft,
  FiDollarSign,
  FiFileText,
  FiPackage,
  FiShoppingCart,
} from "react-icons/fi";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import SectionCard from "../SectionCard";

const listMenu = [
  {
    title: "Pesanan Pembelian",
    icon: <FiShoppingCart size={"50px"} />,
    path: paths.purchase.purchaseOrder.root,
  },
  {
    title: "Penerimaan Barang",
    icon: <FiPackage size={"50px"} />,
    path: paths.purchase.purchaseReceived.root,
  },
  {
    title: "Pengembalian Barang",
    icon: <FiCornerUpLeft size={"50px"} />,
    path: paths.purchase.purchaseReturn.root,
  },
  {
    title: "Faktur Pembelian",
    icon: <FiFileText size={"50px"} />,
    path: paths.purchase.purchaseFaktur.root,
  },
  {
    title: "Utang Usaha",
    icon: <FiDollarSign size={"50px"} />,
    path: paths.purchase.purchasePayable.root,
  },
];

const DataPurchaseList = () => {
  return (
    <Grid columns={{ sm: "2", md: "4" }} gap={"3"}>
      {listMenu.map((menu, index) => (
        <SectionCard
          index={index}
          icon={menu.icon}
          path={menu.path}
          title={menu.title}
          key={index}
        />
      ))}
    </Grid>
  );
};

export default DataPurchaseList;

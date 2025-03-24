import { paths } from "@/paths/paths";
import { Grid } from "@radix-ui/themes";
import Link from "next/link";
import {
  FiCornerUpLeft,
  FiCreditCard,
  FiDollarSign,
  FiFileText,
  FiPackage,
  FiShoppingCart,
} from "react-icons/fi";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
  {
    title: "Pembayaran",
    icon: <FiCreditCard size={"50px"} />,
    path: paths.purchase.purchasePayment.root,
  },
];

const DataPurchaseList = () => {
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

export default DataPurchaseList;

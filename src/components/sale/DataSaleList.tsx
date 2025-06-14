import { paths } from "@/paths/paths";
import { Grid } from "@radix-ui/themes";
import { FiFileText } from "react-icons/fi";

import SectionCard from "@/components/SectionCard";

const listMenu = [
  {
    title: "Faktur Penjualan",
    icon: <FiFileText size={"50px"} />,
    path: paths.sale.saleFaktur.root,
  },
  // {
  //   title: "Pengembalian Barang",
  //   icon: <FiCornerUpLeft size={"50px"} />,
  //   path: paths.sale.saleReturn.root,
  // },

  // {
  //   title: "Piutang Usaha",
  //   icon: <FiDollarSign size={"50px"} />,
  //   path: paths.sale.saleReturn.root,
  // },
  // {
  //   title: "Pembayaran",
  //   icon: <FiCreditCard size={"50px"} />,
  //   path: paths.sale.salePayment.root,
  // },
];
const DataSaleList = () => {
  return (
    <Grid columns={{ sm: "2", md: "4" }} gap={"3"}>
      {listMenu.map((menu, index) => (
        <SectionCard index={index} menu={menu} key={index} />
      ))}
    </Grid>
  );
};

export default DataSaleList;

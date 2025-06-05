import { paths } from "@/paths/paths";
import { Grid } from "@radix-ui/themes";
import { DollarSign } from "lucide-react";
import { FiBook } from "react-icons/fi";
import { LuBookText } from "react-icons/lu";

import SectionCard from "@/components/SectionCard";

const listMenu = [
  // {
  //   title: "Piutang Customer",
  //   icon: <BiArchive size={"50px"} />,
  //   path: paths.dataMaster.product.root,
  // },
  {
    title: "metode pembayaran",
    icon: <DollarSign size={"50px"} />,
    path: paths.finance.paymentMethod,
  },
  {
    title: "Pelunasan Piutang",
    icon: <FiBook size={"50px"} />,
    path: paths.sale.saleFaktur.payment,
  },
  {
    title: "Pelunasan Hutang",
    icon: <LuBookText size={"50px"} />,
    path: paths.dataMaster.supplier.root,
  },
];
const DataFinanceList = () => {
  return (
    <Grid columns={{ sm: "2", md: "4" }} gap={"3"}>
      {listMenu.map((menu, index) => (
        <SectionCard index={index} menu={menu} key={index} />
      ))}
    </Grid>
  );
};

export default DataFinanceList;

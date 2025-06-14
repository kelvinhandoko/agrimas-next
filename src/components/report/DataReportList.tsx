import { paths } from "@/paths/paths";
import { Grid } from "@radix-ui/themes";
import { BiArchive, BiBook } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { LuBookMinus, LuBookText } from "react-icons/lu";

import SectionCard from "../SectionCard";

const listMenu = [
  {
    title: "Laporan Stok",
    icon: <BiArchive size={"50px"} />,
    path: paths.report.stock,
  },
  {
    title: "Laporan Piutang",
    icon: <BiBook size={"50px"} />,
    path: paths.report.receiveable,
  },
  {
    title: "Laporan Utang",
    icon: <FiBook size={"50px"} />,
    path: paths.report.payable,
  },
  {
    title: "Laporan Penjualan",
    icon: <LuBookText size={"50px"} />,
    path: paths.report.sale,
  },
  {
    title: "Laporan Pembelian",
    icon: <LuBookMinus size={"50px"} />,
    path: paths.report.purchase,
  },
];
const DataReportList = () => {
  return (
    <Grid columns={{ sm: "2", md: "4" }} gap={"3"}>
      {listMenu.map((menu, index) => (
        <SectionCard index={index} menu={menu} key={index} />
      ))}
    </Grid>
  );
};

export default DataReportList;

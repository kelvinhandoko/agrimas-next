import { paths } from "@/paths/paths";
import { Grid } from "@radix-ui/themes";
import Link from "next/link";
import { BiArchive, BiBook } from "react-icons/bi";
import { FiBook, FiFolder } from "react-icons/fi";
import { LuBookMinus, LuBookText } from "react-icons/lu";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const listMenu = [
  {
    title: "Piutang Customer",
    icon: <BiArchive size={"50px"} />,
    path: paths.dataMaster.product.root,
  },
  {
    title: "Hutang Customer",
    icon: <BiBook size={"50px"} />,
    path: paths.dataMaster.supplier.root,
  },
  {
    title: "Pelunasan Piutang",
    icon: <FiBook size={"50px"} />,
    path: paths.dataMaster.supplier.root,
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

export default DataFinanceList;

import { paths } from "@/paths/paths";
import { Grid } from "@radix-ui/themes";
import Link from "next/link";
import { FiBook, FiFolder } from "react-icons/fi";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const listMenu = [
  {
    title: "Daftar Akun",
    icon: <FiFolder size={"50px"} />,
    path: paths.accountant.chartOfAccount,
  },
  {
    title: "Jurnal Umum",
    icon: <FiBook size={"50px"} />,
    path: paths.accountant.journal,
  },
];
const DataAccountantList = () => {
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

export default DataAccountantList;

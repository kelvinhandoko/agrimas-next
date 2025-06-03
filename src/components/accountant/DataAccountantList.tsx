import { paths } from "@/paths/paths";
import { Grid } from "@radix-ui/themes";
import { FiBook, FiFolder } from "react-icons/fi";

import SectionCard from "@/components/SectionCard";

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
        <SectionCard menu={menu} index={index} key={index} />
      ))}
    </Grid>
  );
};

export default DataAccountantList;

import { paths } from "@/paths/paths";
import { api } from "@/trpc/server";
import { Grid } from "@radix-ui/themes";
import { Book } from "lucide-react";
import { BiBook } from "react-icons/bi";
import { FiBook } from "react-icons/fi";

import SectionCard from "../SectionCard";

const DataReportList = async () => {
  const data = await api.account.get({
    search: "kas besar",
    page: 1,
  });
  const kasBesar = data.data.at(-1)?.id;

  const listMenu = [
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
      title: "Laporan Mutasi Kas",
      icon: <Book size={"50px"} />,
      path: `${paths.accountant.generalLedger}/${kasBesar}`,
    },
  ];

  return (
    <Grid columns={{ sm: "2", md: "4" }} gap={"3"}>
      {listMenu.map((menu, index) => (
        <SectionCard index={index} menu={menu} key={index} />
      ))}
    </Grid>
  );
};

export default DataReportList;

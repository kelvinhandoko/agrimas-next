import { paths } from "@/paths/paths";
import { Grid } from "@radix-ui/themes";
import { Book, BookCopy, ReceiptTextIcon } from "lucide-react";
import React from "react";

import SectionCard from "@/components/SectionCard";

const listMenu = [
  {
    title: "daftar akun",
    icon: <Book size={"50px"} />,
    path: paths.accountant.chartOfAccount,
  },
  {
    title: "jurnal umum",
    icon: <ReceiptTextIcon size={"50px"} />,
    path: paths.accountant.journal,
  },
  {
    title: "buku besar",
    icon: <BookCopy size={"50px"} />,
    path: paths.accountant.generalLedger,
  },
];

const DataAccountantList = () => {
  return (
    <Grid columns={{ sm: "2", md: "4" }} gap={"3"}>
      {listMenu.map((menu, index) => (
        <SectionCard index={index} menu={menu} key={index} />
      ))}
    </Grid>
  );
};

export default DataAccountantList;

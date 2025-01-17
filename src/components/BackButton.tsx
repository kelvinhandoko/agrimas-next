import Link from "next/link";
import React from "react";

import { Button } from "./ui/button";

const BackButton = ({ path }: { path: string }) => {
  return (
    <Link href={path}>
      <Button variant={"outline"}>Kembali</Button>
    </Link>
  );
};

export default BackButton;

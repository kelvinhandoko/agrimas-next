import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "./ui/button";

const BackButton = ({ path }: { path: string }) => {
  return (
    <Link href={path}>
      <Button size="icon" type="button" variant={"outline"}>
        <ChevronLeft />
      </Button>
    </Link>
  );
};

export default BackButton;

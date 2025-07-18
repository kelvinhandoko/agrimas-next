import { Box } from "@radix-ui/themes";
import { FC } from "react";

import { Card } from "./ui/card";

interface ICardReportMobileProps {
  children?: React.ReactNode;
}

const CardReportMobile: FC<ICardReportMobileProps> = ({ children }) => {
  return (
    <Card className="block overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md lg:hidden">
      <div>
        <Box>{children}</Box>
      </div>
    </Card>
  );
};

export default CardReportMobile;

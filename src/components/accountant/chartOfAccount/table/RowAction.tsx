"use client";

import { FC } from "react";

import { AccountRouterOutputs } from "@/server/account";

interface ChartOfAccountRowActionProps {
  data: AccountRouterOutputs["get"]["data"][number];
}

const ChartOfAccountRowAction: FC<ChartOfAccountRowActionProps> = ({
  data,
}) => {
  return <div></div>;
};

export default ChartOfAccountRowAction;

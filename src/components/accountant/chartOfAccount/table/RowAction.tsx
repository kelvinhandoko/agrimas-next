"use client";

import { type FC } from "react";

import { type AccountRouterOutputs } from "@/server/account";

interface ChartOfAccountRowActionProps {
  data: AccountRouterOutputs["get"]["data"][number];
}

const ChartOfAccountRowAction: FC<ChartOfAccountRowActionProps> = ({
  data,
}) => {
  return <div></div>;
};

export default ChartOfAccountRowAction;

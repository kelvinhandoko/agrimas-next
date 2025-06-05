"use client";

import { paths } from "@/paths/paths";
import { Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import * as React from "react";

import AccountMenu from "./AccountMenu";
import ListItem from "./ListItem";
import NavigationMobile from "./NavigationMobile";

const menuItems = [
  {
    title: "Data Master",
    path: paths.dataMaster.root,
    subPaths: [
      paths.dataMaster.product.root,
      paths.dataMaster.supplier.root,
      paths.dataMaster.customer.root,
      paths.dataMaster.employee.root,
    ],
  },
  {
    title: "Penjualan",
    path: paths.sale.root,
    subPaths: [paths.sale.saleOrder.root],
  },
  {
    title: "Pembelian",
    path: paths.purchase.root,
    subPaths: [paths.purchase.purchaseOrder.root],
  },
  {
    title: "Akuntansi",
    path: paths.accountant.root,
    subPaths: [paths.accountant.chartOfAccount],
  },
  {
    title: "Laporan",
    path: paths.report.root,
    subPaths: [
      paths.report.payable,
      paths.report.receiveable,
      paths.report.stock,
    ],
  },
  {
    title: "Keuangan",
    path: paths.finance.root,
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [activePath, setActivePath] = React.useState("");

  React.useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <Text className="block font-bold md:hidden" size={"5"}>
        Agrimas
      </Text>
      <nav className="hidden w-screen md:block">
        <ul className="flex w-full space-x-4">
          {menuItems.map((item) => (
            <li key={item.title}>
              <ListItem
                title={item.title}
                path={item.path}
                isActive={
                  item.subPaths
                    ? item.subPaths.some((subPath) =>
                        activePath.startsWith(subPath),
                      ) || activePath.startsWith(item.path)
                    : activePath === item.path
                }
              />
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center">
        <div className="hidden md:block">
          <AccountMenu />
        </div>
        <div className="block md:hidden">
          <NavigationMobile menuItems={menuItems} />
        </div>
      </div>
    </div>
  );
}

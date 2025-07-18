"use client";

import { paths } from "@/paths/paths";
import { Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import * as React from "react";

import AccountMenu from "./AccountMenu";
import ListItemDropdown from "./ListItemDropdown";
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
    dropdownMenuItems: [
      {
        title: "Produk",
        path: paths.dataMaster.product.root,
      },
      {
        title: "Supplier",
        path: paths.dataMaster.supplier.root,
      },
      {
        title: "Customer",
        path: paths.dataMaster.customer.root,
      },
      {
        title: "Karyawan",
        path: paths.dataMaster.employee.root,
      },
    ],
  },
  {
    title: "Penjualan",
    path: paths.sale.root,
    subPaths: [paths.sale.saleFaktur.root],
    dropdownMenuItems: [
      {
        title: "Faktur Penjualan",
        path: paths.sale.saleFaktur.root,
      },
      {
        title: "Retur Penjualan",
        path: paths.sale.saleReturn.root,
      },
    ],
  },
  {
    title: "Pembelian",
    path: paths.purchase.root,
    subPaths: [paths.purchase.purchaseOrder.root],
    dropdownMenuItems: [
      {
        title: "Pesanan Pembelian",
        path: paths.purchase.purchaseOrder.root,
      },
      {
        title: "Penerimaan Barang",
        path: paths.purchase.purchaseReceived.root,
      },
      {
        title: "Faktur Pembelian",
        path: paths.purchase.purchaseFaktur.root,
      },
      {
        title: "Retur Pembelian",
        path: paths.purchase.purchaseReturn.root,
      },
    ],
  },
  {
    title: "Akuntansi",
    path: paths.accountant.root,
    subPaths: [paths.accountant.chartOfAccount],
    dropdownMenuItems: [
      {
        title: "Daftar Akun",
        path: paths.accountant.chartOfAccount,
      },
      {
        title: "Jurnal Umum",
        path: paths.accountant.journal,
      },
      {
        title: "Buku Besar",
        path: paths.accountant.generalLedger,
      },
    ],
  },
  {
    title: "Laporan",
    path: paths.report.root,
    subPaths: [
      paths.report.payable,
      paths.report.receiveable,
      paths.report.stock,
      paths.report.sale,
      paths.report.purchase,
    ],
    dropdownMenuItems: [
      {
        title: "Laporan Stok",
        path: paths.report.stock,
      },
      {
        title: "Laporan Piutang",
        path: paths.report.receiveable,
      },
      {
        title: "Laporan Hutang",
        path: paths.report.payable,
      },
      {
        title: "Laporan Penjualan",
        path: paths.report.sale,
      },
      {
        title: "Laporan Pembelian",
        path: paths.report.purchase,
      },
    ],
  },
  {
    title: "Keuangan",
    path: paths.finance.root,
    dropdownMenuItems: [
      {
        title: "Metode Pembayaran",
        path: paths.finance.paymentMethod,
      },
      {
        title: "Pelunasan Piutang",
        path: paths.sale.saleFaktur.payment,
      },
      {
        title: "Pelunasan Hutang",
        path: paths.purchase.purchasePayment.new,
      },
    ],
  },
];

export function NavigationV2() {
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
              <ListItemDropdown
                title={item.title}
                path={item.path}
                isActive={
                  item.subPaths
                    ? item.subPaths.some((subPath) =>
                        activePath.startsWith(subPath),
                      ) || activePath.startsWith(item.path)
                    : activePath === item.path
                }
                dropdownMenus={item.dropdownMenuItems}
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

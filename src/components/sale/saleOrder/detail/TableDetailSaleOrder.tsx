import { formatPrice } from "@/utils/format-price";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const purchaseOrderDetails = [
  {
    itemName: "Barang 1",
    qty: 2,
    discount: 10, // 10%
    vat: 11, // 11%
    total: 20000000,
  },
  {
    itemName: "Barang 2",
    qty: 3,
    discount: 5, // 5%
    vat: 11, // 11%
    total: 7500000,
  },
  {
    itemName: "Barang 3",
    qty: 5,
    discount: 2.5, // 2.5%
    vat: 11, // 11%
    total: 3750000,
  },
  {
    itemName: "Barang 4",
    qty: 2,
    discount: 7.5, // 7.5%
    vat: 11, // 11%
    total: 5000000,
  },
  {
    itemName: "Barang 5",
    qty: 4,
    discount: 3, // 3%
    vat: 11, // 11%
    total: 6000000,
  },
];

const subTotal = purchaseOrderDetails.reduce(
  (acc, curr) => acc + curr.total,
  0,
);

export function TableDetailSaleOrder() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Barang</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Diskon</TableHead>
          <TableHead>PPN</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchaseOrderDetails.map((po, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{po.itemName}</TableCell>
            <TableCell>{po.qty}</TableCell>
            <TableCell>{po.discount}%</TableCell>
            <TableCell>{po.vat}%</TableCell>
            <TableCell>{formatPrice(po.total)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="text-right">
            Sub Total
          </TableCell>
          <TableCell></TableCell>
          <TableCell>{formatPrice(subTotal)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} className="text-right">
            PPN
          </TableCell>
          <TableCell>0%</TableCell>
          <TableCell>{formatPrice(0)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} className="text-right">
            Diskon
          </TableCell>
          <TableCell>0%</TableCell>
          <TableCell>{formatPrice(0)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} className="text-right">
            Total
          </TableCell>
          <TableCell></TableCell>
          <TableCell>{formatPrice(subTotal)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

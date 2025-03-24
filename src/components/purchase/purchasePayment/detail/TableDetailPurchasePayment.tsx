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

const purchasePayments = [
  {
    date: "2025-03-01",
    totalBill: 2000000,
    amount: 1500000,
    dueAmount: 100000,
    paymentMethod: "Bank Mandiri",
  },
];

export function TableDetailPurchasePayment() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Total Tagihan</TableHead>
          <TableHead>Jumlah Pembayaran</TableHead>
          <TableHead>Sisa Tagihan</TableHead>
          <TableHead>Jenis Pembayaran</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchasePayments.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{invoice.date}</TableCell>
            <TableCell>{formatPrice(invoice.totalBill)}</TableCell>
            <TableCell>{formatPrice(invoice.amount)}</TableCell>
            <TableCell>{formatPrice(invoice.dueAmount)}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

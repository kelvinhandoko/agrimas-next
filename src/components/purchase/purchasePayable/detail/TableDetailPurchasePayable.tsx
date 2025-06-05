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
    amount: 1500000,
    paymentMethod: "Bank Mandiri",
  },
  {
    date: "2025-03-05",
    amount: 2000000,
    paymentMethod: "Bank BCA",
  },
  {
    date: "2025-03-10",
    amount: 1000000,
    paymentMethod: "Tunai",
  },
  {
    date: "2025-03-15",
    amount: 500000,
    paymentMethod: "Tunai",
  },
  {
    date: "2025-03-20",
    amount: 3000000,
    paymentMethod: "Bank Mandiri",
  },
];

const totalTagihan = 10000000;
const totalPembayaran = purchasePayments.reduce(
  (sum, item) => sum + item.amount,
  0,
);
const sisaTagihan = totalTagihan - totalPembayaran;

export function TableDetailPurchasePayable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Jumlah Pembayaran</TableHead>
          <TableHead>Jenis Pembayaran</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchasePayments.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{invoice.date}</TableCell>
            <TableCell>{formatPrice(invoice.amount)}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total Tagihan</TableCell>
          <TableCell>{formatPrice(totalTagihan)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Total Pembayaran</TableCell>
          <TableCell>{formatPrice(totalPembayaran)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Sisa Tagihan</TableCell>
          <TableCell>{formatPrice(sisaTagihan)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

import { paths } from "@/paths/paths";
import { formatPrice } from "@/utils/format-price";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DetailJournalPageProps {
  id: string;
}

const invoices = [
  {
    code: "111012",
    nameAccount: "Kas",
    debit: 1000000,
    credit: 0,
  },
  {
    code: "411012",
    nameAccount: "Penjualan",
    debit: 0,
    credit: 1000000,
  },
];

const DetailJournalPage = ({ id }: DetailJournalPageProps) => {
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.accountant.journal} />
      </Box>
      <Box>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">
          Jurnal Umum Detail
        </h2>
        <Box className="mt-8 grid grid-cols-12">
          <Box className="col-span-5">
            <Table>
              <TableBody>
                <TableRow className="border-0">
                  <TableCell className="w-1/3 font-semibold">
                    Nama Perusahaan
                  </TableCell>
                  <TableCell>:</TableCell>
                  <TableCell>PT Agrimas</TableCell>
                </TableRow>
                <TableRow className="border-0">
                  <TableCell className="w-1/3 font-semibold">
                    No Referensi
                  </TableCell>
                  <TableCell>:</TableCell>
                  <TableCell>J00001</TableCell>
                </TableRow>
                <TableRow className="border-0">
                  <TableCell className="w-1/3 font-semibold">Tanggal</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell>09 Maret 2025</TableCell>
                </TableRow>
                <TableRow className="border-0">
                  <TableCell className="w-1/3 font-semibold">
                    Deskripsi
                  </TableCell>
                  <TableCell>:</TableCell>
                  <TableCell>menerima pendapatan 1jt</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
        {/* detail journal table */}
        <Table className="mt-5">
          <TableHeader>
            <TableRow className="bg-[#624DE3] text-white hover:bg-[#624DE3] hover:text-white">
              <TableHead className="text-white">Kode Akun</TableHead>
              <TableHead className="text-white">Nama Akun</TableHead>
              <TableHead className="text-white">Debit</TableHead>
              <TableHead className="text-white">Kredit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{invoice.code}</TableCell>
                <TableCell>{invoice.nameAccount}</TableCell>
                <TableCell>
                  {invoice.debit > 0 && formatPrice(invoice.debit)}
                </TableCell>
                <TableCell>
                  {invoice.credit > 0 && formatPrice(invoice.credit)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
              <TableCell>{formatPrice(1000000)}</TableCell>
              <TableCell>{formatPrice(1000000)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
    </Box>
  );
};

export default DetailJournalPage;

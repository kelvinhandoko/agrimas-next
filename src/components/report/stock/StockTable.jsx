import { api } from "@/trpc/react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale";
import { NumericFormat } from "react-number-format";

import LoadingIndicator from "@/components/LoadingIndicator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StockTable = ({ dataReportStock, isLoading = false }) => {
  return (
    <Box>
      <Flex justify={"center"} direction={"column"} align={"center"}>
        <Text size="5">CV. Agrimas Perkasa</Text>
        <Text size="6">LAPORAN STOK</Text>
        <Text size="4" className="mt-2">
          01 Mei 2025 - 25 Mei 2025
        </Text>
      </Flex>
      <Box className="mt-14">
        {isLoading && <LoadingIndicator />}
        {dataReportStock && Object.keys(dataReportStock).length > 0 ? (
          Object.entries(dataReportStock).map(([barang, invoices]) => (
            <Box key={barang} className="mb-4">
              <Text weight={"medium"}>
                {barang} | {invoices[0].kodeProduk}
              </Text>
              {/* <pre>{JSON.stringify(invoices, undefined, 2)}</pre> */}
              <Table className="pl-10">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[220px]">Nomor#</TableHead>
                    <TableHead className="w-[220px]">Tanggal</TableHead>
                    <TableHead className="w-[320px]">Masuk</TableHead>
                    <TableHead className="w-[320px]">Keluar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices &&
                    invoices?.map((invoice, index) =>
                      invoice.transaksi.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">
                            {item.noRef}
                          </TableCell>
                          <TableCell>
                            {item?.tanggal
                              ? formatInTimeZone(
                                  new Date(item.tanggal),
                                  "Asia/Jakarta",
                                  "dd MMMM yyyy",
                                  { locale: id },
                                )
                              : "-"}
                          </TableCell>
                          <TableCell>
                            {item.tipe === "masuk" && item.jumlah}
                          </TableCell>
                          <TableCell>
                            {item.tipe === "keluar" && item.jumlah}
                          </TableCell>
                        </TableRow>
                      )),
                    )}
                  {/* <TableRow>
                    <TableCell colSpan={"3"} className="font-bold">
                      Total
                    </TableCell>
                    <TableCell className="font-bold">
                      Rp{" "}
                      {invoices
                        .reduce((sum, inv) => sum + inv.totalAfter, 0)
                        .toLocaleString("id-ID")}
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </Box>
          ))
        ) : (
          <Flex justify="center">
            <Text>Tidak ada hutang</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default StockTable;

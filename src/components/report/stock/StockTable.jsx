/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Flex, Text } from "@radix-ui/themes";
import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale";

import CardReportMobile from "@/components/CardReportMobile";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Card } from "@/components/ui/card";
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
      <Box className="mt-10 lg:mt-14">
        {isLoading && <LoadingIndicator />}
        {dataReportStock && Object.keys(dataReportStock).length > 0 ? (
          Object.entries(dataReportStock).map(([barang, invoices]) => (
            <Box key={barang} className="mb-4">
              <Text weight={"medium"}>
                {barang} | {invoices[0].kodeProduk}
              </Text>
              {/* desktop view */}
              <Table className="hidden pl-10 lg:table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[220px]">Nomor#</TableHead>
                    <TableHead className="w-[220px]">Tanggal</TableHead>
                    <TableHead className="w-[320px]">Masuk</TableHead>
                    <TableHead className="w-[320px]">Keluar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices?.map((invoice, index) =>
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
                        <TableCell className="font-bold text-green-600">
                          {item.tipe === "masuk" ? item.jumlah : 0}
                        </TableCell>
                        <TableCell className="font-bold text-red-600">
                          {item.tipe === "keluar" ? item.jumlah : 0}
                        </TableCell>
                      </TableRow>
                    )),
                  )}
                </TableBody>
              </Table>
              {/* mobile view */}
              <div className="mt-4 flex flex-col space-y-4">
                {invoices?.map((invoice, index) =>
                  invoice.transaksi.map((item, idx) => (
                    <CardReportMobile key={idx}>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Nomor
                        </Text>
                        <Text className="font-medium">{item.noRef}</Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Tanggal
                        </Text>
                        <Text className="font-medium">
                          {" "}
                          {item?.tanggal
                            ? formatInTimeZone(
                                new Date(item.tanggal),
                                "Asia/Jakarta",
                                "dd MMMM yyyy",
                                { locale: id },
                              )
                            : "-"}
                        </Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Masuk
                        </Text>
                        <Text className="font-bold text-green-600">
                          {item.tipe === "masuk" ? item.jumlah : 0}
                        </Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Keluar
                        </Text>
                        <Text className="font-bold text-red-600">
                          {item.tipe === "keluar" ? item.jumlah : 0}
                        </Text>
                      </Box>
                    </CardReportMobile>
                  )),
                )}
              </div>
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

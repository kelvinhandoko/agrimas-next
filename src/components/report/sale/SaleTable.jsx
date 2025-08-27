/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Box, Flex, Text } from "@radix-ui/themes";
import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale";
import { NumericFormat } from "react-number-format";

import CardReportMobile from "@/components/CardReportMobile";
import LoadingIndicator from "@/components/LoadingIndicator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SalesTable = ({ dataSalesReport, isLoading = false }) => {
  return (
    <Box>
      <Flex justify={"center"} direction={"column"} align={"center"}>
        <Text size="5">CV. Agrimas Perkasa</Text>
        <Text size="6">LAPORAN PENJUALAN</Text>
      </Flex>

      <Box className="mt-14">
        {isLoading && <LoadingIndicator />}

        {dataSalesReport && Object.keys(dataSalesReport).length > 0 ? (
          Object.entries(dataSalesReport).map(([customer, sales]) => (
            <Box key={customer} className="mb-6">
              <div className="flex items-center justify-between">
                <Text weight={"medium"} className="mb-2">
                  {customer}
                </Text>
                <NumericFormat
                  value={sales.reduce((sum, inv) => sum + inv.totalAmount, 0)}
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                  className="block font-bold lg:hidden"
                />
              </div>
              {/* desktop view */}
              <Table className="hidden pl-10 lg:table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Invoice</TableHead>
                    <TableHead className="w-[200px]">Tanggal</TableHead>
                    <TableHead>Nama Produk</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Harga Produk</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale) =>
                    sale.items.map((item, idx) => (
                      <TableRow key={`${sale.id}-${idx}`}>
                        {idx === 0 && (
                          <>
                            <TableCell rowSpan={sale.items.length}>
                              {sale.invoiceNumber}
                            </TableCell>
                            <TableCell rowSpan={sale.items.length}>
                              {sale.date
                                ? formatInTimeZone(
                                    new Date(sale.date),
                                    "Asia/Jakarta",
                                    "dd MMMM yyyy",
                                    { locale: id },
                                  )
                                : "-"}
                            </TableCell>
                          </>
                        )}
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.qty}</TableCell>
                        <TableCell>
                          <NumericFormat
                            value={item.price}
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="Rp "
                          />
                        </TableCell>
                        <TableCell>
                          <NumericFormat
                            value={item.price * item.qty}
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="Rp "
                          />
                        </TableCell>
                      </TableRow>
                    )),
                  )}
                  <TableRow>
                    <TableCell colSpan={"5"} className="font-bold">
                      Total
                    </TableCell>
                    <TableCell className="font-bold">
                      Rp{" "}
                      {sales
                        .reduce((sum, inv) => sum + inv.totalAmount, 0)
                        .toLocaleString("id-ID")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* mobile view */}
              <div className="mt-4 flex flex-col space-y-4 lg:hidden">
                {sales.map((sale) =>
                  sale.items.map((item, idx) => (
                    <CardReportMobile key={`${sale.id}-${idx}`}>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Nomor
                        </Text>
                        <Text className="font-medium">
                          {sale.invoiceNumber}
                        </Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Tanggal
                        </Text>
                        <Text className="font-medium">
                          {" "}
                          {sale?.date
                            ? formatInTimeZone(
                                new Date(sale.date),
                                "Asia/Jakarta",
                                "dd MMMM yyyy",
                                { locale: id },
                              )
                            : "-"}
                        </Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Nama Produk
                        </Text>
                        <Text className="font-medium">{item.name}</Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Qty
                        </Text>
                        <Text className="font-medium">{item.qty}</Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Harga Produk
                        </Text>
                        <Text className="font-medium">
                          <NumericFormat
                            value={item.price}
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="Rp "
                          />
                        </Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Total
                        </Text>
                        <Text className="font-medium">
                          <NumericFormat
                            value={item.price * item.qty}
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="Rp "
                          />
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
            <Text>Tidak ada data penjualan</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default SalesTable;

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
              <Text weight={"medium"} className="mb-2">
                {customer}
              </Text>
              <Table className="pl-10">
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
                  {/* {sales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">
                        {sale.invoiceNumber}
                      </TableCell>
                      <TableCell>
                        {sale.date
                          ? formatInTimeZone(
                              new Date(sale.date),
                              "Asia/Jakarta",
                              "dd MMMM yyyy",
                              { locale: id },
                            )
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {sale.items.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{item.name}</TableCell>
                          </TableRow>
                        ))}
                      </TableCell>
                      <TableCell>
                        {sale.items.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{item.qty}</TableCell>
                          </TableRow>
                        ))}
                      </TableCell>
                      <TableCell>
                        {sale.items.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{item.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableCell>
                      <TableCell>
                        {sale.items.map((item, idx) => (
                          <TableRow key={idx}>
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
                        ))}
                      </TableCell>
                    </TableRow>
                  ))} */}
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

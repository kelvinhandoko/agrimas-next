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

const PurchaseTable = ({ dataPurchaseReport, isLoading = false }) => {
  return (
    <Box>
      <Flex justify={"center"} direction={"column"} align={"center"}>
        <Text size="5">CV. Agrimas Perkasa</Text>
        <Text size="6">LAPORAN PEMBELIAN</Text>
      </Flex>

      <Box className="mt-14">
        {isLoading && <LoadingIndicator />}

        {dataPurchaseReport && Object.keys(dataPurchaseReport).length > 0 ? (
          Object.entries(dataPurchaseReport).map(([supplier, purchases]) => (
            <Box key={supplier} className="mb-6">
              <div className="flex items-center justify-between">
                <Text weight={"medium"} className="mb-2">
                  {supplier}
                </Text>
                <NumericFormat
                  value={purchases.reduce(
                    (sum, inv) => sum + inv.totalAmount,
                    0,
                  )}
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
                  {purchases.map((purchase) =>
                    purchase.items.map((item, idx) => (
                      <TableRow key={`${purchase.id}-${idx}`}>
                        {idx === 0 && (
                          <>
                            <TableCell rowSpan={purchase.items.length}>
                              {purchase.invoiceNumber}
                            </TableCell>
                            <TableCell rowSpan={purchase.items.length}>
                              {purchase.date
                                ? formatInTimeZone(
                                    new Date(purchase.date),
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
                      {purchases
                        .reduce((sum, inv) => sum + inv.totalAmount, 0)
                        .toLocaleString("id-ID")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* mobile view */}
              <div className="mt-4 flex flex-col space-y-4 lg:hidden">
                {purchases.map((purchase) =>
                  purchase.items.map((item, idx) => (
                    <CardReportMobile key={`${purchase.id}-${idx}`}>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Nomor
                        </Text>
                        <Text className="font-medium">
                          {purchase.invoiceNumber}
                        </Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Tanggal
                        </Text>
                        <Text className="font-medium">
                          {purchase?.date
                            ? formatInTimeZone(
                                new Date(purchase.date),
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
            <Text>Tidak ada data pembelian</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default PurchaseTable;

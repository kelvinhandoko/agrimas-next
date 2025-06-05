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
              <Text weight={"medium"} className="mb-2">
                {supplier}
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
                  {purchases.map((sale) =>
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
                      {purchases
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
            <Text>Tidak ada data pembelian</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default PurchaseTable;

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

const ReceiveableTable = ({ isLoading, dataReportReceiveable }) => {
  return (
    <Box>
      <Flex justify={"center"} direction={"column"} align={"center"}>
        <Text size="5">CV. Agrimas Perkasa</Text>
        <Text size="6">LAPORAN PIUTANG CUSTOMER</Text>
      </Flex>
      <Box className="mt-14">
        {isLoading && <LoadingIndicator />}
        {dataReportReceiveable &&
        Object.keys(dataReportReceiveable).length > 0 ? (
          Object.entries(dataReportReceiveable).map(([customer, invoices]) => (
            <Box key={customer} className="mb-4">
              <Text weight={"medium"}>{customer}</Text>
              <Table className="pl-10">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[220px]">Nomor#</TableHead>
                    <TableHead className="w-[220px]">Tanggal</TableHead>
                    <TableHead className="w-[320px]">Jatuh Tempo</TableHead>
                    <TableHead>Piutang</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice, index) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.ref}
                      </TableCell>
                      <TableCell>
                        {formatInTimeZone(
                          invoice.date,
                          "Asia/Jakarta",
                          "dd MMMM yyyy",
                          { locale: id },
                        )}
                      </TableCell>
                      <TableCell>
                        {formatInTimeZone(
                          invoice.dueDate,
                          "Asia/Jakarta",
                          "dd MMMM yyyy",
                          { locale: id },
                        )}
                      </TableCell>
                      <TableCell>
                        <NumericFormat
                          value={invoice.totalAfter}
                          displayType="text"
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="Rp "
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={"3"} className="font-bold">
                      Total
                    </TableCell>
                    <TableCell className="font-bold">
                      Rp{" "}
                      {invoices
                        .reduce((sum, inv) => sum + inv.totalAfter, 0)
                        .toLocaleString("id-ID")}
                    </TableCell>
                  </TableRow>
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

export default ReceiveableTable;

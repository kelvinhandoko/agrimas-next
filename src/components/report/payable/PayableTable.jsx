import { api } from "@/trpc/react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { format } from "date-fns";
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

const PayableTable = ({ dataReportPayable, isLoading = false }) => {
  return (
    <Box>
      <Flex justify={"center"} direction={"column"} align={"center"}>
        <Text size="5">CV. Agrimas Perkasa</Text>
        <Text size="6">LAPORAN HUTANG USAHA</Text>
      </Flex>
      <Box className="mt-10 lg:mt-14">
        {isLoading && <LoadingIndicator />}
        {dataReportPayable && Object.keys(dataReportPayable).length > 0 ? (
          Object.entries(dataReportPayable).map(([customer, invoices]) => (
            <Box key={customer} className="mb-4">
              <div className="flex items-center justify-between">
                <Text weight={"medium"} className="mb-2">
                  {customer}
                </Text>
                <NumericFormat
                  value={invoices.reduce((sum, inv) => sum + inv.totalAfter, 0)}
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
                    <TableHead className="w-[220px]">Nomor#</TableHead>
                    <TableHead className="w-[220px]">Tanggal</TableHead>
                    <TableHead className="w-[320px]">Jatuh Tempo</TableHead>
                    <TableHead>Hutang</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices &&
                    invoices?.map((invoice, index) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          {invoice.ref}
                        </TableCell>
                        <TableCell>
                          {invoice?.date
                            ? formatInTimeZone(
                                new Date(invoice.date),
                                "Asia/Jakarta",
                                "dd MMMM yyyy",
                                { locale: id },
                              )
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {invoice?.dueDate
                            ? formatInTimeZone(
                                new Date(invoice.dueDate),
                                "Asia/Jakarta",
                                "dd MMMM yyyy",
                                { locale: id },
                              )
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <NumericFormat
                            value={invoice?.totalAfter}
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
              {/* mobile view */}
              <div className="mt-4 flex flex-col space-y-4 lg:hidden">
                {invoices &&
                  invoices?.map((invoice, index) => (
                    <CardReportMobile key={invoice.id}>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Nomor
                        </Text>
                        <Text className="font-medium">{invoice.ref}</Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Tanggal
                        </Text>
                        <Text className="font-medium">
                          {invoice?.date
                            ? formatInTimeZone(
                                new Date(invoice.date),
                                "Asia/Jakarta",
                                "dd MMMM yyyy",
                                { locale: id },
                              )
                            : "-"}
                        </Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Jatuh Tempo
                        </Text>
                        <Text className="font-medium">
                          {invoice?.dueDate
                            ? formatInTimeZone(
                                new Date(invoice.dueDate),
                                "Asia/Jakarta",
                                "dd MMMM yyyy",
                                { locale: id },
                              )
                            : "-"}
                        </Text>
                      </Box>
                      <Box className="flex items-center justify-between p-4">
                        <Text className="font-medium text-muted-foreground">
                          Hutang
                        </Text>
                        <Text className="font-medium">
                          Rp {invoice?.totalAfter.toLocaleString("id-ID")}
                        </Text>
                      </Box>
                    </CardReportMobile>
                  ))}
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

export default PayableTable;

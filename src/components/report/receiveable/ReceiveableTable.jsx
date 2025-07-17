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

const ReceiveableTable = ({ isLoading, dataReportReceiveable }) => {
  return (
    <Box>
      <Flex
        justify={"center"}
        className="flex-col flex-wrap text-center"
        align={"center"}
      >
        <Text size="5">CV. Agrimas Perkasa</Text>
        <Text size="6">LAPORAN PIUTANG CUSTOMER</Text>
      </Flex>
      <Box className="mt-10 lg:mt-14">
        {isLoading && <LoadingIndicator />}
        {dataReportReceiveable &&
        Object.keys(dataReportReceiveable).length > 0 ? (
          Object.entries(dataReportReceiveable).map(
            ([customer, receiveables]) => (
              <Box key={customer} className="mb-4">
                <div className="flex items-center justify-between">
                  <Text weight={"medium"} className="mb-2">
                    {customer}
                  </Text>
                  <NumericFormat
                    value={receiveables.reduce(
                      (sum, inv) => sum + inv.totalAfter,
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
                      <TableHead className="w-[220px]">Nomor#</TableHead>
                      <TableHead className="w-[220px]">Tanggal</TableHead>
                      <TableHead className="w-[320px]">Jatuh Tempo</TableHead>
                      <TableHead>Piutang</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receiveables.map((receiveable, index) => (
                      <TableRow key={receiveable.id}>
                        <TableCell className="font-medium">
                          {receiveable.ref}
                        </TableCell>
                        <TableCell>
                          {formatInTimeZone(
                            receiveable.date,
                            "Asia/Jakarta",
                            "dd MMMM yyyy",
                            { locale: id },
                          )}
                        </TableCell>
                        <TableCell>
                          {formatInTimeZone(
                            receiveable.dueDate,
                            "Asia/Jakarta",
                            "dd MMMM yyyy",
                            { locale: id },
                          )}
                        </TableCell>
                        <TableCell>
                          <NumericFormat
                            value={receiveable.totalAfter}
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
                        {receiveables
                          .reduce((sum, inv) => sum + inv.totalAfter, 0)
                          .toLocaleString("id-ID")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {/* mobile view */}
                <div className="mt-4 flex flex-col space-y-4 lg:hidden">
                  {receiveables &&
                    receiveables?.map((receiveable, index) => (
                      <CardReportMobile key={receiveable.id}>
                        <Box className="flex items-center justify-between p-4">
                          <Text className="font-medium text-muted-foreground">
                            Nomor
                          </Text>
                          <Text className="font-medium">{receiveable.ref}</Text>
                        </Box>
                        <Box className="flex items-center justify-between p-4">
                          <Text className="font-medium text-muted-foreground">
                            Tanggal
                          </Text>
                          <Text className="font-medium">
                            {receiveable?.date
                              ? formatInTimeZone(
                                  new Date(receiveable.date),
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
                            {receiveable?.dueDate
                              ? formatInTimeZone(
                                  new Date(receiveable.dueDate),
                                  "Asia/Jakarta",
                                  "dd MMMM yyyy",
                                  { locale: id },
                                )
                              : "-"}
                          </Text>
                        </Box>
                        <Box className="flex items-center justify-between p-4">
                          <Text className="font-medium text-muted-foreground">
                            Piutang
                          </Text>
                          <Text className="font-medium">
                            Rp {receiveable?.totalAfter.toLocaleString("id-ID")}
                          </Text>
                        </Box>
                      </CardReportMobile>
                    ))}
                </div>
              </Box>
            ),
          )
        ) : (
          <Flex justify="center">
            <Text>Tidak ada piutang</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default ReceiveableTable;

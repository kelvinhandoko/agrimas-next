"use client";

import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { predefinedRanges } from "@/utils/dateHelper";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import { type FC } from "react";
import { NumericFormat } from "react-number-format";

import { type ReportRouterOutput } from "@/server/report/report.router";

import LoadingIndicator from "@/components/LoadingIndicator";
import { TableRowAnimation } from "@/components/motion/variant";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReceiveableReportTableProps {
  data?: ReportRouterOutput["receivable"];
  isLoading: boolean;
}

const ReceiveableReportTable: FC<ReceiveableReportTableProps> = ({
  data,
  isLoading,
}) => {
  const searchParams = useSearchParams();
  const from =
    searchParams.get("from") || predefinedRanges.thisMonth.from.toISO()!;
  const to = searchParams.get("to") || predefinedRanges.thisMonth.to.toISO()!;

  if (!data) return null;
  if (isLoading) return <LoadingIndicator />;

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <CardTitle className="text-xl">CV. Agrimas Perkasa</CardTitle>
        <CardTitle className="text-2xl uppercase">
          LAPORAN PIUTANG CUSTOMER
        </CardTitle>
        <CardTitle className="text-xl">
          {DateTime.fromISO(from).toFormat(DATE_FORMAT)} -{" "}
          {DateTime.fromISO(to).toFormat(DATE_FORMAT)}
        </CardTitle>
      </div>

      <div>
        <Accordion type="single" collapsible>
          {Object.entries(data).map(([customerName, customerData]) => (
            <AccordionItem value={customerName} key={customerName}>
              <AccordionTrigger>{customerName}</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nomor#</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jatuh Tempo</TableHead>
                      <TableHead>Jumlah Hutang</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerData.map((data, index) => (
                      <TableRow
                        animate="visible"
                        initial="hidden"
                        variants={TableRowAnimation}
                        custom={index % 20}
                        key={index}
                      >
                        <TableCell className="font-medium">
                          {data.ref}
                        </TableCell>
                        <TableCell>
                          {DateTime.fromJSDate(data.date).toFormat(DATE_FORMAT)}
                        </TableCell>
                        <TableCell>
                          {DateTime.fromJSDate(data.dueDate).toFormat(
                            DATE_FORMAT,
                          )}
                        </TableCell>
                        <TableCell>
                          <NumericFormat
                            value={data.totalAfter - data.totalPayment}
                            {...NUMERIC_PROPS}
                            displayType="text"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell className="text-right" colSpan={3}>
                        Total
                      </TableCell>
                      <TableCell>
                        <NumericFormat
                          value={customerData.reduce(
                            (acc, data) =>
                              acc + data.totalAfter - data.totalPayment,
                            0,
                          )}
                          {...NUMERIC_PROPS}
                          displayType="text"
                        />
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ReceiveableReportTable;

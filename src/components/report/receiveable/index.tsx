"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { predefinedRanges } from "@/utils/dateHelper";
import { ChevronDown, FileText } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

import BackButton from "@/components/BackButton";
import DateRangePicker from "@/components/common/input/DateRangePicker";
import CustomerFilter from "@/components/filter/CustomerFilter";
import ReceiveableReportTable from "@/components/report/receiveable/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ReceiveableReport = () => {
  const searchParams = useSearchParams();
  const from =
    searchParams.get("from") || predefinedRanges.thisMonth.from.toISO()!;
  const to = searchParams.get("to") || predefinedRanges.thisMonth.to.toISO()!;
  const customerId = searchParams.get("customerId") ?? "";
  const { data, isLoading } = api.report.receivable.useQuery({
    customerId,
    dateRange: { from, to },
  });
  return (
    <Card className="p-4">
      <CardHeader className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <BackButton path={paths.report.root} />
          <CardTitle>Laporan Piutang</CardTitle>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CustomerFilter />
            <DateRangePicker label="semua tanggal" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-bold text-[#624DE3] transition"
            >
              <div>
                <FileText className="h-5 w-5" /> Export
                <ChevronDown className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                <Image
                  src="/icon/excel.png"
                  alt="Icon excel"
                  width={25}
                  height={25}
                />
                Excel
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                <Image
                  src="/icon/pdf.png"
                  alt="Icon pdf"
                  width={25}
                  height={25}
                />
                Pdf
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <ReceiveableReportTable data={data} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default ReceiveableReport;

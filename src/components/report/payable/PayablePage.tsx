"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { predefinedRanges } from "@/utils/dateHelper";
import { useSearchParams } from "next/navigation";
import React from "react";

import BackButton from "@/components/BackButton";
import DateRangePicker from "@/components/common/input/DateRangePicker";
import SupplierFilter from "@/components/filter/SupplierFilter";
import ExportPayableReport from "@/components/report/payable/ExportPayableReport";
import PayableTable from "@/components/report/payable/PayableTableTemp";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PayablePageTemp = () => {
  const searchParams = useSearchParams();
  const supplier = searchParams.get("supplierId") ?? undefined;
  const from =
    searchParams.get("from") || predefinedRanges.thisMonth.from.toISO()!;
  const to = searchParams.get("to") || predefinedRanges.thisMonth.to.toISO()!;
  const { data: dataReportPayable, isLoading } = api.report.payable.useQuery({
    supplier,
    dateRange: { from, to },
  });
  if (!dataReportPayable && isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-6">
      <BackButton path={paths.report.root} />

      <Card className="w-full py-7 lg:px-4">
        <CardHeader>
          <div className="flex items-center gap-4">
            <SupplierFilter />
            <DateRangePicker label="semua tanggal" />
          </div>
          <ExportPayableReport data={dataReportPayable!} />
        </CardHeader>
        <CardContent>
          <PayableTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default PayablePageTemp;

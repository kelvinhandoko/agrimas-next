/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box } from "@radix-ui/themes";
import { pdf } from "@react-pdf/renderer";
import ExcelJS from "exceljs";
import { ChevronDown, FileText } from "lucide-react";
import { DateTime } from "luxon";
import Image from "next/image";
import { type FC } from "react";
import { toast } from "sonner";

import { type ReportRouterOutput } from "@/server/report/report.router";

import PayableReport from "@/components/report/payable/PayableReport";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

interface ExportPayableReportProps {
  data: ReportRouterOutput["payable"];
}

const ExportPayableReport: FC<ExportPayableReportProps> = ({ data }) => {
  const handleDownloadPDF = async () => {
    const blob = await pdf(<PayableReport data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const nameFile = "Laporan-Hutang";
    link.href = url;
    link.download = `${nameFile}.pdf`;
    link.click();
  };

  const handleExportExcel = async () => {
    if (!data || Object.keys(data).length === 0) {
      toast.error("Data tidak tersedia untuk diexport.");
      return;
    }
    const rows: Record<string, any>[] = [];

    Object.entries(data).forEach(([supplier, invoices]) => {
      invoices.forEach((inv) => {
        rows.push({
          supplier: supplier,
          "No Invoice": inv.ref,
          Tanggal: new Date(inv.date).toLocaleDateString("id-ID"),
          "Jatuh Tempo": DateTime.fromJSDate(inv.date)
            .plus({ days: 30 })
            .toJSDate()
            .toLocaleDateString("id-ID"),
          Hutang: inv.totalAfter,
        });
      });
    });

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Laporan Hutang Usaha");

    // Add title
    worksheet.mergeCells("A1:E1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "Laporan Hutang Usaha CV. Agrimas Perkasa";
    titleCell.font = { bold: true, size: 14 };
    titleCell.alignment = { horizontal: "center" };

    // Add headers
    const headers = Object.keys(rows[0]!);
    worksheet.addRow(headers);
    worksheet.getRow(2).font = { bold: true };

    // Add data
    rows.forEach((row) => {
      worksheet.addRow(Object.values(row));
    });

    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });

    // Generate and download the file
    const fileName = "Laporan-Hutang-Usaha.xlsx";

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <Box className="col-span-12 mt-4 justify-end place-self-end lg:col-span-7 lg:mt-0">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-bold text-[#624DE3] transition">
          <FileText className="h-5 w-5" /> Export
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2"
            onClick={handleExportExcel}
          >
            <Image
              src="/icon/excel.png"
              alt="Icon excel"
              width={25}
              height={25}
            />
            Excel
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2"
            onClick={handleDownloadPDF}
          >
            <Image src="/icon/pdf.png" alt="Icon pdf" width={25} height={25} />
            Pdf
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  );
};

export default ExportPayableReport;

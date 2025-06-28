"use client";

import { dummyPayableData } from "@/data/dummyPayableData";
import { dummyPayableSupplier } from "@/data/dummyPayableSupplier";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box, Text } from "@radix-ui/themes";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import ExcelJS from "exceljs";
import { ChevronDown, FileText } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PayableReport from "./PayableReport";
import PayableTable from "./PayableTable";

const PayablePage = () => {
  const form = useForm({
    // resolver: zodResolver(FormSchema),
    defaultValues: {
      supplier_id: "",
    },
  });

  const [supplierId, setSupplierId] = useState("all");
  const onSubmit = async (data) => {
    setSupplierId(data.supplier_id);
    toast.success("Berhasil filter hutang usaha");
  };
  const { data: dataSupplierPayable, isLoading: isLoadingGet } =
    api.supplier.getAll.useQuery({});

  // const { data: dataReportPayable, isLoading } = api.report.payable.useQuery(
  //   {
  //     supplier: supplierId !== "all" ? supplierId : undefined,
  //   },
  //   {
  //     enabled: supplierId !== "",
  //   },
  // );

  const filterDataPayable =
    supplierId === "all"
      ? dummyPayableData
      : { [supplierId]: dummyPayableData[supplierId] };

  const handleDownloadPDF = async () => {
    const blob = await pdf(<PayableReport data={filterDataPayable} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const found =
      supplierId !== "all" &&
      dummyPayableSupplier?.data.find((c) => c.id === supplierId);

    const nameFile =
      supplierId === "all" ? "Laporan-Hutang" : `Laporan-Hutang-${found.nama}`;
    link.href = url;
    link.download = `${nameFile}.pdf`;
    link.click();
  };

  const handleExportExcel = async () => {
    if (!filterDataPayable || Object.keys(filterDataPayable).length === 0) {
      toast.error("Data tidak tersedia untuk diexport.");
      return;
    }
    const rows = [];

    Object.entries(filterDataPayable).forEach(([supplier, invoices]) => {
      invoices.forEach((inv) => {
        rows.push({
          supplier: supplier,
          "No Invoice": inv.ref,
          Tanggal: new Date(inv.date).toLocaleDateString("id-ID"),
          "Jatuh Tempo": new Date(inv.dueDate).toLocaleDateString("id-ID"),
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
    const headers = Object.keys(rows[0]);
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

    const found =
      supplierId !== "all" &&
      dummyPayableSupplier?.data.find((c) => c.id === supplierId);

    // Generate and download the file
    const fileName =
      supplierId === "all"
        ? "Laporan-Hutang-Usaha.xlsx"
        : `Laporan-Hutang-Usaha-${found.nama}.xlsx`;

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

  if (isLoadingGet) {
    return <LoadingIndicator />;
  }
  return (
    <Box className="w-full">
      <Box className="mb-8">
        <BackButton path={paths.report.root} />
      </Box>
      <Card className="w-full px-4 py-7">
        <CardContent>
          <Text size={"5"} weight={"bold"}>
            Laporan Hutang Usaha
          </Text>
          <Box asChild>
            <div className="grid w-full grid-cols-12 items-end">
              <Box className="col-span-5">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-6 flex items-end justify-between"
                  >
                    <FormField
                      control={form.control}
                      name="supplier_id"
                      render={({ field }) => (
                        <FormItem className="mr-4 w-full">
                          <FormLabel>Pilih Supplier</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih supplier" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={"all"} key={"all"}>
                                Keseluruhan
                              </SelectItem>
                              {dummyPayableSupplier?.data.map(
                                (supplier, index) => (
                                  <SelectItem value={supplier.id} key={index}>
                                    {supplier.nama}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Tampilkan</Button>
                  </form>
                </Form>
              </Box>
              <Box className="col-span-7 justify-end place-self-end">
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
              </Box>
            </div>
          </Box>
          <Box className="mt-20">
            <PayableTable
              isLoading={false}
              dataReportPayable={filterDataPayable}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PayablePage;

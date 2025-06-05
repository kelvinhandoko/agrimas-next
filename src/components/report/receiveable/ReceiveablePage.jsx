"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box, Text } from "@radix-ui/themes";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import { ChevronDown, FileText } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as XLSX from "xlsx";

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

import ReceiveableReport from "./ReceiveableReport";
import ReceiveableTable from "./ReceiveableTable";

const ReceiveablePage = () => {
  const form = useForm({
    // resolver: zodResolver(FormSchema),
    defaultValues: {
      customer_id: "",
    },
  });

  const [customerId, setCustomerId] = useState("all");
  const onSubmit = async (data) => {
    setCustomerId(data.customer_id);
    toast.success("Berhasil filter piutang usaha");
  };

  const { data: dataCustomerReceiveable, isLoading: isLoadingGet } =
    api.customer.getAll.useQuery({});

  const { data: dataReportReceiveable, isLoading } =
    api.report.receivable.useQuery(
      {
        customerId: customerId !== "all" ? customerId : undefined,
      },
      {
        enabled: customerId !== "",
      },
    );

  const handleDownloadPDF = async () => {
    const blob = await pdf(
      <ReceiveableReport data={dataReportReceiveable} />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const found =
      customerId !== "all" &&
      dataCustomerReceiveable?.data.find((c) => c.id === customerId);

    const nameFile =
      customerId === "all"
        ? "Laporan-Piutang"
        : `Laporan-Piutang-${found.nama}`;
    link.href = url;
    link.download = `${nameFile}.pdf`;
    link.click();
  };

  const handleExportExcel = () => {
    if (
      !dataReportReceiveable ||
      Object.keys(dataReportReceiveable).length === 0
    ) {
      toast.error("Data tidak tersedia untuk diexport.");
      return;
    }
    const rows = [];

    Object.entries(dataReportReceiveable).forEach(([customer, invoices]) => {
      invoices.forEach((inv) => {
        rows.push({
          Customer: customer,
          "No Invoice": inv.ref,
          Tanggal: new Date(inv.date).toLocaleDateString("id-ID"),
          "Jatuh Tempo": new Date(inv.dueDate).toLocaleDateString("id-ID"),
          Piutang: inv.totalAfter,
        });
      });
    });
    // 1. Siapkan worksheet dari data
    const worksheet = XLSX.utils.json_to_sheet(rows, { origin: "A3" });

    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Laporan Piutang CV. Agrimas Perkasa"],
    ]);

    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];

    // 2. Buat workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Piutang");

    const found =
      customerId !== "all" &&
      dataCustomerReceiveable?.data.find((c) => c.id === customerId);

    // 3. Simpan file Excel
    const fileName =
      customerId === "all"
        ? "Laporan-Piutang.xlsx"
        : `Laporan-Piutang-${found.nama}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  if (isLoadingGet) {
    return <LoadingIndicator />;
  }

  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.report.root} />
      </Box>
      {/* <pre>{JSON.stringify(dataReportReceiveable, undefined, 2)}</pre> */}
      <Card className="px-4 py-7">
        <CardContent>
          <Text size={"5"} weight={"bold"}>
            Laporan Piutang Customer
          </Text>
          <Box className="grid grid-cols-12 items-end justify-between">
            <Box className="col-span-5 items-end">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 flex items-end justify-between"
                >
                  <FormField
                    control={form.control}
                    name="customer_id"
                    render={({ field }) => (
                      <FormItem className="mr-4 w-full">
                        <FormLabel>Pilih Customer</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih customer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"all"} key={"all"}>
                              Keseluruhan
                            </SelectItem>
                            {dataCustomerReceiveable &&
                              dataCustomerReceiveable.data.map(
                                (customer, index) => (
                                  <SelectItem value={customer.id} key={index}>
                                    {customer.nama}
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
          </Box>
          <Box className="mt-20">
            <ReceiveableTable
              isLoading={isLoading}
              dataReportReceiveable={dataReportReceiveable}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReceiveablePage;

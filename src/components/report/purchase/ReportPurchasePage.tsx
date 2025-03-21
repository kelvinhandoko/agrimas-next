"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, FileText } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReportPurchasePage = () => {
  const form = useForm<any>({
    // resolver: zodResolver(FormSchema),
    defaultValues: {
      supplier: "",
      tgl_awal: "",
      tgl_akhir: "",
    },
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      toast.promise(
        async () => {
          return {};
        },
        {
          loading: "Memproses...",
          success: async () => {
            return "Berhasil filter laporan pembelian";
          },
          error: (error) => {
            if (error instanceof Error) {
              return error.message;
            }
            return "Terjadi kesalahan";
          },
        },
      );
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const { data: dataSupplierReportSale, isLoading: isLoadingGet } =
    api.supplier.getAll.useQuery({});
  if (isLoadingGet) {
    return <LoadingIndicator />;
  }
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.report.root} />
      </Box>
      <Card className="px-4 py-7">
        <CardContent>
          <Text size={"5"} weight={"bold"}>
            Laporan Pembelian
          </Text>
          <Box className="grid grid-cols-12 items-end">
            <Box className="col-span-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 flex items-end"
                >
                  <Box>
                    <Flex align={"end"} gapX={"2"}>
                      <FormField
                        control={form.control}
                        name="tgl_awal"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Tanggal Awal</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                                side="bottom"
                                sideOffset={4}
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                  className="flex h-full w-full"
                                  classNames={{
                                    months:
                                      "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                                    month: "space-y-4 w-full flex flex-col",
                                    table:
                                      "w-full h-full border-collapse space-y-1",
                                    head_row: "",
                                    row: "w-full mt-2",
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tgl_akhir"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Tanggal Akhir</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                                side="bottom"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  className="flex h-full w-full"
                                  classNames={{
                                    months:
                                      "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                                    month: "space-y-4 w-full flex flex-col",
                                    table:
                                      "w-full h-full border-collapse space-y-1",
                                    head_row: "",
                                    row: "w-full mt-2",
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="supplier"
                        render={({ field }) => (
                          <FormItem className="mr-4 w-full">
                            <FormLabel>Supplier</FormLabel>
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
                                <SelectItem value="m@example.com">
                                  Keseluruhan
                                </SelectItem>
                                {dataSupplierReportSale?.data.map(
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
                    </Flex>
                  </Box>
                  <Button type="submit">Tampilkan</Button>
                </form>
              </Form>
            </Box>
            <Box className="col-span-2 justify-end place-self-end">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-bold text-[#624DE3] transition">
                  <FileText className="h-5 w-5" /> Export
                  <ChevronDown className="h-4 w-4" />
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
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportPurchasePage;

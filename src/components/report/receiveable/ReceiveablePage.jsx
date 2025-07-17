"use client";

import { dummyReceivableData } from "@/data/dummyReceiveableData";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box, Text } from "@radix-ui/themes";
import { ChevronDown, FileText } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import ReceiveableTable from "@/components/report/receiveable/ReceiveableTable";
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

const ReceiveablePage = () => {
  const form = useForm({
    // resolver: zodResolver(FormSchema),
    defaultValues: {
      customer_id: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      toast.promise(
        async () => {
          return {};
        },
        {
          loading: "Memproses...",
          success: async () => {
            return "Berhasil filter piutang usaha";
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
  const { data: dataCustomerReceiveable, isLoading: isLoadingGet } =
    api.customer.getAll.useQuery({});
  if (isLoadingGet) {
    return <LoadingIndicator />;
  }
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.report.root} />
      </Box>
      <Card className="py-7 lg:px-4">
        <CardContent>
          <Text size={"5"} weight={"bold"}>
            Laporan Piutang Customer
          </Text>
          <Box className="grid grid-cols-12 items-end justify-between">
            <Box className="col-span-12 lg:col-span-5 lg:items-end">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 flex flex-col items-end justify-between lg:flex-row"
                >
                  <FormField
                    control={form.control}
                    name="customer_id"
                    render={({ field }) => (
                      <FormItem className="w-full lg:mr-4">
                        <FormLabel>Pilih Customer</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value ?? ""}
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
                            {dataCustomerReceiveable?.data.map(
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
                  <Button
                    type="submit"
                    className="mt-6 w-full lg:mt-0 lg:w-auto"
                  >
                    Tampilkan
                  </Button>
                </form>
              </Form>
            </Box>
            <Box className="col-span-12 mt-4 justify-end place-self-end lg:col-span-7 lg:mt-0">
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
          <Box className="mt-10 lg:mt-20">
            <ReceiveableTable
              isLoading={false}
              dataReportReceiveable={dummyReceivableData}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReceiveablePage;

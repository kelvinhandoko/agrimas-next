"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box, Grid, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import SaleOrderForm from "./SaleOrderForm";

const AddNewSaleOrderPage = () => {
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<any>({
    // resolver: zodResolver(supplierPayloadSchema),
    defaultValues: {
      details: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details",
    keyName: "uid",
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    try {
      toast.promise(
        async () => {
          //   return void(data);
        },
        {
          loading: "Memproses...",
          success: async () => {
            await utils.supplier.getAll.invalidate();
            setIsLoading(false);
            form.reset();
            return "Berhasil tambah produk";
          },
          error: (error) => {
            setIsLoading(false);
            if (error instanceof Error) {
              return error.message;
            }
            return "Terjadi kesalahan";
          },
        },
      );
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.sale.saleOrder.root} />
      </Box>
      <Box>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(console.log)}>
            <Grid columns={{ initial: "1", md: "2" }} gap="4">
              {/* No Penjualan */}
              <FormField
                control={form.control}
                name="no_penjualan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No Penjualan</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan No Penjualan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Grid>

            <Grid columns={{ initial: "1", md: "2" }} gap="4" className="mt-3">
              {/* Tanggal */}
              <FormField
                control={form.control}
                name="tanggal"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
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
                        className="mb-4 max-h-64 w-full overflow-auto"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="w-full"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tanggal jatuh tempo */}
              <FormField
                control={form.control}
                name="tanggal"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tgl Jatuh Tempo</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
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
                        className="mb-4 max-h-64 w-full overflow-auto"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="w-full"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Grid>
            <Grid columns={{ initial: "1", md: "2" }} gap="4" className="mt-3">
              {/* Nama Customer */}
              <FormField
                control={form.control}
                name="alamat_customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Customer</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan Nama Customer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Alamat Customer */}
              <FormField
                control={form.control}
                name="alamat_customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Customer</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Masukkan alamat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Grid>
            <Grid columns={{ initial: "1", md: "2" }} gap="4" className="mt-3">
              {/* Deskripsi */}
              <FormField
                control={form.control}
                name="deskripsi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Masukkan Deskripsi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Grid>

            <hr className="my-7" />
            <Box className="flex justify-end">
              <Button
                type="button"
                onClick={() =>
                  append({
                    accountId: "",
                  })
                }
              >
                <PlusIcon /> Tambah Baris
              </Button>
            </Box>
            <Box className="mt-5">
              {fields.map((field, index) => (
                <SaleOrderForm
                  control={form.control}
                  field={field}
                  index={index}
                  remove={() => remove(index)}
                  key={index}
                />
              ))}
            </Box>
            <hr className="my-7" />
            <Box className="flex flex-col items-end">
              <Grid columns={{ initial: "1", md: "2" }} gap="4" justify={"end"}>
                <Box></Box>
                <Box className="flex flex-col items-end justify-end gap-3">
                  <Grid columns={{ initial: "1", md: "3" }} gap="4">
                    <Text className="text-right">Sub Total</Text>
                    <Box></Box>
                    <FormField
                      control={form.control}
                      name="no_penjualan"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Grid>
                  <Box className="flex">
                    <Grid columns={{ initial: "1", md: "3" }} gap="4">
                      <Text className="text-right">PPN</Text>
                      <Box className="flex items-center gap-3">
                        <FormField
                          control={form.control}
                          name="no_penjualan"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Text>%</Text>
                      </Box>
                      <FormField
                        control={form.control}
                        name="no_penjualan"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Grid>
                  </Box>
                  <Box className="flex">
                    <Grid columns={{ initial: "1", md: "3" }} gap="4">
                      <Text className="text-right">Diskon</Text>
                      <Box className="flex items-center gap-3">
                        <FormField
                          control={form.control}
                          name="no_penjualan"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Text>%</Text>
                      </Box>
                      <FormField
                        control={form.control}
                        name="no_penjualan"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Grid>
                  </Box>
                  <Grid columns={{ initial: "1", md: "3" }} gap="4">
                    <Text className="text-right">Total</Text>
                    <Box></Box>
                    <FormField
                      control={form.control}
                      name="no_penjualan"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Grid>
                </Box>
              </Grid>
              {/* Submit Button */}
              <Box className="mt-4 flex items-center gap-2">
                <Button
                  type="submit"
                  variant={"destructiveOnline"}
                  className="mt-4"
                >
                  Batal
                </Button>
                <Button type="submit" className="mt-4">
                  Simpan
                </Button>
              </Box>
            </Box>
          </form>
        </Form>
      </Box>
    </Box>
  );
};

export default AddNewSaleOrderPage;

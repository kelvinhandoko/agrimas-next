"use client";

import {
  type SalePayload,
  salePayloadSchema,
} from "@/model/dummy/sale-order.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid } from "@radix-ui/themes";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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

import SaleOrder from "./SaleOrderRow";

const AddNewSaleOrderPage = () => {
  const defaultValues = {
    saleDate: undefined,
    ref: "",
    note: "",
    discount: 0,
    ppn: 0,
    customerId: "",
    detail: [
      {
        purchaseId: "",
        productId: "",
        quantity: 1,
        price: 0,
        discount: 0,
        ppn: 0,
      },
    ],
  };

  const { data: dataCustomer, isLoading } = api.customer.getAll.useQuery({});

  const form = useForm<SalePayload>({
    resolver: zodResolver(salePayloadSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = form;
  const onSubmit: SubmitHandler<SalePayload> = async (data) => {
    try {
      console.log(data);
      toast.success("Berhasil tambah pesanan pembelian");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("error", errors);

  return (
    <Box>
      {/* <pre>{JSON.stringify(errors, undefined, 2)}</pre> */}
      {/* <pre>{JSON.stringify(getValues(), undefined, 2)}</pre> */}
      <Box className="mb-8">
        <BackButton path={paths.sale.saleOrder.root} />
      </Box>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid columns={{ initial: "1", md: "2" }}>
            <FormField
              control={form.control}
              name="ref"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Penjualan</FormLabel>
                  <FormControl>
                    <Input placeholder="no penjualan (opsional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid>
          <Grid columns={{ initial: "1", md: "2" }} className="mt-3">
            {/* Tanggal */}
            <FormField
              control={form.control}
              name="saleDate"
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
                        className="flex h-full w-full"
                        classNames={{
                          months:
                            "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                          month: "space-y-4 w-full flex flex-col",
                          table: "w-full h-full border-collapse space-y-1",
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
          </Grid>
          <Grid columns={{ initial: "1", md: "2" }} className="mt-3">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Customer</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? dataCustomer?.data.find(
                                (customer) => customer.id === field.value,
                              )?.nama
                            : "Select customer"}
                          <ChevronsUpDownIcon className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search customer..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No customer found.</CommandEmpty>
                          <CommandGroup>
                            {dataCustomer?.data.map((customer) => (
                              <CommandItem
                                value={customer.id}
                                key={customer.id}
                                onSelect={() => {
                                  form.setValue("customerId", customer.id);
                                }}
                              >
                                {customer.nama}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto",
                                    customer.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid>
          <Grid columns={{ initial: "1", md: "2" }} className="mt-3">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="deskripsi...."
                      rows={4}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid>
          <hr className="my-7" />
          {/* <PurchaseOrderRow
            control={control}
            setValue={setValue}
            watch={watch}
          /> */}
          <SaleOrder control={control} setValue={setValue} watch={watch} />
          {/* Submit Button */}
          <Box className="mt-4 flex items-center justify-end gap-2">
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
        </form>
      </Form>
    </Box>
  );
};

export default AddNewSaleOrderPage;

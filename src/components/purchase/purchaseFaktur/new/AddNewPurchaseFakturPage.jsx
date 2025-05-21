"use client";

import { purchasePayloadSchema } from "@/model/purchase.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid } from "@radix-ui/themes";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
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

import PurchaseFakturRow from "./PurchaseFakturRow";

const AddNewPurchaseFakturPage = () => {
  const defaultValues = {
    purchaseFakturDate: undefined,
    purchaseFakturNo: "",
    ref: "",
    note: "",
    discount: 0,
    ppn: 0,
    supplierId: "",
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

  const { data: dataSuppliers, isLoading } = api.supplier.getAll.useQuery({});

  const form = useForm({
    resolver: zodResolver(purchasePayloadSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = form;
  const onSubmit = async (data) => {
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
        <BackButton path={paths.purchase.purchaseFaktur.root} />
      </Box>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid columns={{ initial: "1", md: "2" }}>
            <FormField
              control={form.control}
              name="ref"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Faktur</FormLabel>
                  <FormControl>
                    <Input placeholder="no faktur (opsional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid>
          <Grid columns={{ initial: "1", md: "2" }} className="mt-3">
            <FormField
              control={form.control}
              name="supplierId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>No Referensi</FormLabel>
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
                            ? dataSuppliers?.data.find(
                                (supplier) => supplier.id === field.value,
                              )?.nama
                            : "Select no referensi"}
                          <ChevronsUpDownIcon className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search no referensi..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No no referensi found.</CommandEmpty>
                          <CommandGroup>
                            {dataSuppliers &&
                              dataSuppliers?.data.map((supplier) => (
                                <CommandItem
                                  value={supplier.id}
                                  key={supplier.id}
                                  onSelect={() => {
                                    form.setValue("supplierId", supplier.id);
                                  }}
                                >
                                  {supplier.nama}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto",
                                      supplier.id === field.value
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
            {/* Tanggal */}
            <FormField
              control={form.control}
              name="purchaseDate"
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
              name="supplierId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Supplier</FormLabel>
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
                            ? dataSuppliers?.data.find(
                                (supplier) => supplier.id === field.value,
                              )?.nama
                            : "Select supplier"}
                          <ChevronsUpDownIcon className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search supplier..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No supplier found.</CommandEmpty>
                          <CommandGroup>
                            {dataSuppliers &&
                              dataSuppliers?.data.map((supplier) => (
                                <CommandItem
                                  value={supplier.id}
                                  key={supplier.id}
                                  onSelect={() => {
                                    form.setValue("supplierId", supplier.id);
                                  }}
                                >
                                  {supplier.nama}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto",
                                      supplier.id === field.value
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
          <PurchaseFakturRow
            control={control}
            setValue={setValue}
            watch={watch}
          />
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

export default AddNewPurchaseFakturPage;

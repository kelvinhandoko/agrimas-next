"use client";

import { purchaseReceivedPayloadSchema } from "@/model/dummy/purchase-received.model";
import { paths } from "@/paths/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid } from "@radix-ui/themes";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useForm } from "react-hook-form";
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

import EditPurchaseReturnRow from "./EditPurchaseReturnRow";

export const dummyPurchaseOrder = [
  {
    id: "PO-001",
    supplier: "supplier-1",
    items: [
      {
        productId: "P-001",
        name: "Produk 1A",
        quantity: 10,
      },
      {
        productId: "P-002",
        name: "Produk 2A",
        quantity: 5,
      },
    ],
  },
  {
    id: "PO-002",
    supplier: "supplier-1",
    items: [
      {
        productId: "P-002",
        name: "Produk 2A",
        quantity: 5,
      },
      {
        productId: "P-003",
        name: "Produk 3A",
        quantity: 8,
      },
      {
        productId: "P-004",
        name: "Produk 4A",
        quantity: 3,
      },
    ],
  },
];

const EditPurchaseReturnPage = ({ id }) => {
  const defaultValues = {
    id: "",
    purchaseOrderId: "",
    receivedDate: undefined,
    note: "",
    supplierId: "",
    detail: [{ id: "", productId: "", quantity: 1 }],
  };
  const form = useForm({
    resolver: zodResolver(purchaseReceivedPayloadSchema),
    defaultValues,
  });

  const {
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      toast.success("Berhasil tambah penerimaan pembelian");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.purchaseReturn.root} />
      </Box>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* no penerimaan */}
          <Grid columns={{ initial: "1", md: "2" }}>
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Pengembalian</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="no pengembalian (opsional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid>
          {/* no pesanan pembelian */}
          <Grid columns={{ initial: "1", md: "2" }} className="mt-3">
            <FormField
              control={form.control}
              name="purchaseOrderId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>No Pesanan Pembelian</FormLabel>
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
                            ? dummyPurchaseOrder?.find(
                                (po) => po.id === field.value,
                              )?.id
                            : "Select po"}
                          <ChevronsUpDownIcon className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search po..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No PO found.</CommandEmpty>
                          <CommandGroup>
                            {dummyPurchaseOrder &&
                              dummyPurchaseOrder?.map((po) => (
                                <CommandItem
                                  value={po.id}
                                  key={po.id}
                                  onSelect={() => {
                                    form.setValue("purchaseOrderId", po.id);
                                  }}
                                >
                                  {po.id}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto",
                                      po.id === field.value
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
          {/* supplier */}
          <Grid columns={{ initial: "1", md: "2" }} className="mt-3">
            <FormField
              control={form.control}
              name="supplierId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <FormControl>
                    <Input placeholder="supplier" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid>
          {/* tanggal */}
          <Grid columns={{ initial: "1", md: "2" }} className="mt-3">
            {/* Tanggal */}
            <FormField
              control={form.control}
              name="receivedDate"
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
          {/* deskripsi */}
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
          <EditPurchaseReturnRow control={control} />
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

export default EditPurchaseReturnPage;

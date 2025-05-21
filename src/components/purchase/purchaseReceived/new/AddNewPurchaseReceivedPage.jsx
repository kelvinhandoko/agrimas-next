"use client";

import { recieveItemPayloadSchema } from "@/model/recieve-item.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid } from "@radix-ui/themes";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

import PurchaseReceivedRow from "./PurchaseReceivedRow";

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

const AddNewPurchaseReceivedPage = () => {
  const defaultValues = {
    id: "",
    purchaseId: "",
    receiveDate: DateTime.now().toJSDate(),
    note: "",
    supplierId: "",
    details: [{ purchaseDetailId: "", productId: "", quantity: 1 }],
  };
  const form = useForm({
    resolver: zodResolver(recieveItemPayloadSchema),
    defaultValues,
  });

  const router = useRouter();

  const {
    control,
    watch,
    formState: { errors },
  } = form;

  const { data: dataPurchaseOrders } = api.purchase.getAll.useQuery({});

  const purchaseId = watch("purchaseId");

  const { mutateAsync: createReceiveItem } =
    api.receiveItem.create.useMutation();

  const onSubmit = async (data) => {
    console.log(data);

    toast.promise(async () => await createReceiveItem(data), {
      loading: "Loading...",
      success: async (e) => {
        router.replace(paths.purchase.purchaseReceived.root);
        return `Berhasil menambahkan penerimaan barang`;
      },
      error: (error) => {
        console.log(error);

        return errorFormatter(error);
      },
    });
  };

  const selectedPO = dataPurchaseOrders?.data.find(
    (po) => po.id === purchaseId,
  );
  useEffect(() => {
    if (selectedPO) {
      form.setValue("supplierId", selectedPO.supplier.nama);
      const mappedDetails = selectedPO.purchaseDetail.map((item) => ({
        purchaseDetailId: item.id,
        productId: item.productId,
        quantity: item.quantity,
      }));

      form.setValue("details", mappedDetails);
    } else {
      form.setValue("supplierId", "");
      form.setValue("details", [{}]);
    }
  }, [purchaseId, dataPurchaseOrders, form]);

  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.purchaseReceived.root} />
      </Box>
      <pre>{JSON.stringify(selectedPO, null, 2)}</pre>
      {/* <pre>{JSON.stringify(dataPurchaseOrders, null, 2)}</pre> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* no penerimaan */}
          <Grid columns={{ initial: "1", md: "2" }}>
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Penerimaan</FormLabel>
                  <FormControl>
                    <Input placeholder="no penerimaan (opsional)" {...field} />
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
              name="purchaseId"
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
                            ? dataPurchaseOrders?.data.find(
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
                            {dataPurchaseOrders &&
                              dataPurchaseOrders?.data.map((po) => (
                                <CommandItem
                                  value={po.id}
                                  key={po.id}
                                  onSelect={() => {
                                    form.setValue("purchaseId", po.id);
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
              name="receiveDate"
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
          <PurchaseReceivedRow
            control={control}
            purchaseDetail={selectedPO?.purchaseDetail}
          />
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

export default AddNewPurchaseReceivedPage;

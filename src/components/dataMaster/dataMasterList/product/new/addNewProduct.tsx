"use client";

import {
  type SupplierPayload,
  supplierPayloadSchema,
} from "@/model/supplier.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Grid, Spinner } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const AddNewProductPage = () => {
  const router = useRouter();
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<any>({
    // resolver: zodResolver(supplierPayloadSchema),
    defaultValues: {
      nama: "",
      sku_product: "",
      price_product: 0,
      supplier_id: "",
      stock: 0,
      is_active: true,
    },
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
        <BackButton path={paths.dataMaster.product.root} />
      </Box>
      <Grid
        columns={{ initial: "1", md: "2" }}
        maxHeight={"100vh"}
        height={"100vh"}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Nama Produk</FormLabel>
                  <FormControl>
                    <Input placeholder="nama produk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku_product"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Kode Produk</FormLabel>
                  <FormControl>
                    <Input placeholder="Kode produk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price_product"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Harga Beli Produk</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Harga beli produk"
                      min={0}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supplier_id"
              render={({ field }) => (
                <FormItem className="mb-3">
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
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Stok Produk</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Stok produk"
                      min={0}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Status</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Flex justify={"end"} className="mt-3 gap-x-3">
              <Link href={paths.dataMaster.customer.root}>
                <Button variant={"destructiveOnline"}>Batal</Button>
              </Link>
              <Button type="submit" disabled={isLoading}>
                <Spinner loading={isLoading} />
                Tambah
              </Button>
            </Flex>
          </form>
        </Form>
      </Grid>
    </Box>
  );
};

export default AddNewProductPage;

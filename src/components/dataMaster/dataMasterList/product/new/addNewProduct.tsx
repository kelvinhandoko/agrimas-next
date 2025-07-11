"use client";

import { NUMERIC_PROPS } from "@/constant";
import {
  type ProductPayload,
  productPayloadSchema,
} from "@/model/product.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Grid, Spinner } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import SupplierInput from "@/components/dataMaster/dataMasterList/product/SupplierInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ProductForm = () => {
  const router = useRouter();
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ProductPayload>({
    resolver: zodResolver(productPayloadSchema),
    defaultValues: {
      name: "",
      price: 0,
      sellingPrice: 0,
      quantity: 0,
      supplierId: "",
      buyingPrice: 0,
    },
  });

  const { mutateAsync: createProduct } = api.product.create.useMutation();
  const onSubmit: SubmitHandler<ProductPayload> = async (data) => {
    setIsLoading(true);

    toast.promise(
      async () => {
        await createProduct(data);
      },
      {
        loading: "Memproses...",
        success: async () => {
          await utils.product.getAll.invalidate();
          setIsLoading(false);
          router.replace(paths.dataMaster.product.root);
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
              name="name"
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
              name="sellingPrice"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Harga jual Produk</FormLabel>
                  <FormControl>
                    <NumericFormat
                      placeholder="Harga jual produk"
                      name={field.name}
                      value={field.value === 0 ? "" : field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      {...NUMERIC_PROPS}
                      displayType="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyingPrice"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Harga Beli Produk</FormLabel>
                  <FormControl>
                    <NumericFormat
                      placeholder="Harga Beli produk"
                      name={field.name}
                      value={field.value === 0 ? "" : field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      {...NUMERIC_PROPS}
                      displayType="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SupplierInput form={form} />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Harga Beli Produk Awal (optional)</FormLabel>
                  <FormControl>
                    <NumericFormat
                      placeholder="optional"
                      name={field.name}
                      value={field.value === 0 ? "" : field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      {...NUMERIC_PROPS}
                      displayType="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Quantity Produk Awal (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="optional"
                      min={0}
                      name={field.name}
                      value={field.value === 0 ? "" : field.value}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Flex justify={"end"} className="mt-3 gap-x-3">
              <Link href={paths.dataMaster.product.root}>
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

export default ProductForm;

"use client";

import {
  type SupplierPayload,
  supplierPayloadSchema,
} from "@/model/supplier.model";
import { paths } from "@/paths/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Grid, Spinner } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
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
import { Textarea } from "@/components/ui/textarea";

const AddNewSupplierPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SupplierPayload>({
    resolver: zodResolver(supplierPayloadSchema),
    defaultValues: { nama: "", alamat: "" },
  });

  const simulateAddSupplier = (data: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true; // Simulasi hasil sukses
        if (success) {
          resolve("Berhasil tambah supplier");
        } else {
          reject(new Error("Gagal tambah supplier"));
        }
      }, 5000); // Simulasi delay 2 detik
    });
  };
  const onSubmit: SubmitHandler<SupplierPayload> = async (data) => {
    setIsLoading(true);
    try {
      toast.promise(
        async () => {
          return simulateAddSupplier(data); // Simulasi operasi asinkron
        },
        {
          loading: "Memproses...",
          success: async () => {
            setIsLoading(false);
            return "Berhasil tambah supplier";
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
  console.log(form.formState.isSubmitting);

  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.supplier.root} />
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
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="nama supplier" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="alamat supplier"
                      rows={4}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Flex justify={"end"} className="mt-3 gap-x-3">
              <Link href={paths.dataMaster.supplier.root}>
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

export default AddNewSupplierPage;

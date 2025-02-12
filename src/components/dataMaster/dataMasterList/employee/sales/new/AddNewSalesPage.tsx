"use client";

import { SupplierPayload } from "@/model/supplier.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Grid, Spinner } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AddNewSalesPage = () => {
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<any>({
    // resolver: zodResolver(supplierPayloadSchema),
    defaultValues: {
      nama: "",
      no_hp: "",
      alamat: "",
    },
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      toast.promise(async () => {}, {
        loading: "Memproses...",
        success: async () => {
          // await utils.supplier.getAll.invalidate();
          setIsLoading(false);
          form.reset();
          return "Berhasil tambah user";
        },
        error: (error) => {
          setIsLoading(false);
          if (error instanceof Error) {
            return error.message;
          }
          return "Terjadi kesalahan";
        },
      });
    } catch (error) {
      console.error("error:", error);
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.employee.root} />
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
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="nama user" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_hp"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>No Hp</FormLabel>
                  <FormControl>
                    <Input placeholder="no hp user" {...field} />
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
                      placeholder="alamat user"
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
              <Link href={paths.dataMaster.employee.root}>
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

export default AddNewSalesPage;

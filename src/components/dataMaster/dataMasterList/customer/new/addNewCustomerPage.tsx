"use client";

import {
  type CustomerPayload,
  customerPayloadSchema,
} from "@/model/customer.model";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddNewCustomerPage = () => {
  const router = useRouter();
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CustomerPayload>({
    resolver: zodResolver(customerPayloadSchema),
    defaultValues: { nama: "", alamat: "" },
  });

  const { mutateAsync: createCustomer } = api.customer.create.useMutation();

  const onSubmit: SubmitHandler<CustomerPayload> = async (data) => {
    setIsLoading(true);
    try {
      toast.promise(
        async () => {
          return createCustomer(data);
        },
        {
          loading: "Memproses...",
          success: async () => {
            await utils.customer.getAll.invalidate();
            setIsLoading(false);
            form.reset();
            return "Berhasil tambah customer";
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
      console.error("error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.customer.root} />
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
                    <Input placeholder="nama customer" {...field} />
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
                      placeholder="alamat customer"
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

export default AddNewCustomerPage;

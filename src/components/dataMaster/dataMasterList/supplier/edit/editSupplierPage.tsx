"use client";

import {
  type SupplierPayload,
  supplierPayloadSchema,
} from "@/model/supplier.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Grid, Spinner } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
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

const EditSupplierPage = ({ id }: { id: string }) => {
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: detailSupplier } = api.supplier.getDetail.useQuery({
    id: id,
  });

  const form = useForm<SupplierPayload>({
    resolver: zodResolver(supplierPayloadSchema),
    defaultValues: {
      nama: detailSupplier?.nama ?? "",
      alamat: detailSupplier?.alamat ?? "",
      id,
    },
  });

  const { mutateAsync: updateSupplier } = api.supplier.update.useMutation();

  const onSubmit: SubmitHandler<SupplierPayload> = async (data) => {
    setIsLoading(true);
    try {
      toast.promise(
        async () => {
          return updateSupplier(data);
        },
        {
          loading: "Memproses...",
          position: "top-right",
          success: async () => {
            await utils.supplier.getAll.invalidate();
            setIsLoading(false);
            router.replace(paths.dataMaster.supplier.root);
            return "Berhasil update supplier";
          },
          error: errorFormatter,
        },
      );
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (detailSupplier) {
      form.reset({
        nama: detailSupplier.nama ?? "",
        alamat: detailSupplier.alamat ?? "",
        id: detailSupplier.id,
      });
    }
  }, [detailSupplier, form]);
  if (!detailSupplier) {
    return <LoadingIndicator />;
  }
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
                Update
              </Button>
            </Flex>
          </form>
        </Form>
      </Grid>
    </Box>
  );
};

export default EditSupplierPage;

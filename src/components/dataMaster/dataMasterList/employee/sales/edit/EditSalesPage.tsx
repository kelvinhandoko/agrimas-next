"use client";

import {
  type SalesPersonPayload,
  salesPersonPayloadSchema,
} from "@/model/salesPerson.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Grid, Spinner } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
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

const EditSalesPage = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SalesPersonPayload>({
    resolver: zodResolver(salesPersonPayloadSchema),
    defaultValues: {
      id: id,
      name: "",
    },
  });

  // get detail sales query
  const { data: salesDetail } = api.salesPerson.findDetail.useQuery(
    {
      by: "id",
      identifier: id.toString(),
      companyId: session?.user.companyId ?? "",
    },
    {
      enabled: !!session,
    },
  );

  // update sales mutation
  const { mutateAsync: updateSales } = api.salesPerson.update.useMutation();
  const onSubmit: SubmitHandler<SalesPersonPayload> = async (data) => {
    try {
      toast.promise(async () => updateSales(data), {
        loading: "Memproses...",
        success: async () => {
          await utils.salesPerson.findAll.invalidate();
          setIsLoading(false);
          form.reset();
          return "Berhasil update sales";
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

  useEffect(() => {
    if (salesDetail) {
      form.reset({
        name: salesDetail.name ?? "",
        id: salesDetail.id ?? "",
      });
    }
  }, [salesDetail]);
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
              name="name"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="nama sales" {...field} />
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
                Simpan
              </Button>
            </Flex>
          </form>
        </Form>
      </Grid>
    </Box>
  );
};

export default EditSalesPage;

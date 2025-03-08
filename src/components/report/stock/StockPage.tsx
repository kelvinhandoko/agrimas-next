"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box, Grid, Text } from "@radix-ui/themes";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StockPage = () => {
  const form = useForm<any>({
    // resolver: zodResolver(FormSchema),
    defaultValues: {
      barang: "",
    },
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      toast.promise(
        async () => {
          return {};
        },
        {
          loading: "Memproses...",
          success: async () => {
            return "Berhasil filter stock";
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
  const { data, isLoading: isLoadingGet } = api.supplier.getAll.useQuery({});
  if (isLoadingGet) {
    return <LoadingIndicator />;
  }
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.report.root} />
      </Box>
      <Card className="px-4 py-7">
        <CardContent>
          <Text size={"5"} weight={"bold"}>
            Laporan Stok Barang
          </Text>
          <Grid columns={{ initial: "2" }}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 flex items-end justify-between"
              >
                <FormField
                  control={form.control}
                  name="barang"
                  render={({ field }) => (
                    <FormItem className="mr-4 w-full">
                      <FormLabel>Stok Barang</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih barang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">
                            Keseluruhan
                          </SelectItem>
                          <SelectItem value="m@google.com">Barang A</SelectItem>
                          <SelectItem value="m@support.com">
                            Barang B
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Tampilkan</Button>
              </form>
            </Form>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StockPage;

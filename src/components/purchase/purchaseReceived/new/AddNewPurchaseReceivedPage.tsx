"use client";

import { paths } from "@/paths/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { WithCompany } from "@/server/common";

import BackButton from "@/components/BackButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const purchaseReceivedDetailPayloadSchema = z.object({
  id: z.string().optional().describe("id pembelian detail"),
  productId: z.string().describe("id produk"),
  name: z.string().describe("nama produk"),
  quantity: z.number().describe("jumlah barang"),
});
const purchaseReceivedPayloadSchema = z.object({
  id: z.string().optional().describe("id penerimaan"),
  purchaseReceivedId: z.string().describe("id pembelian"),
  receivedDate: z.date().describe("tanggal pembelian barang"),
  note: z.string().optional().describe("note tambahan (optional)"),
  discount: z.number().nonnegative().default(0).describe("diskon (optional)"),
  ppn: z.number().nonnegative().default(0).describe("ppn (optional)"),
  supplierId: z.string().describe("id supplier"),
  detail: z.array(purchaseReceivedDetailPayloadSchema),
});

type PurchaseReceivedPayload = z.infer<typeof purchaseReceivedPayloadSchema> &
  WithCompany;
const AddNewPurchaseReceivedPage = () => {
  const defaultValues = {
    id: "",
    purchaseReceivedId: "",
  };
  const form = useForm<PurchaseReceivedPayload>({
    resolver: zodResolver(purchaseReceivedPayloadSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
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
        <BackButton path={paths.purchase.purchaseReceived.root} />
      </Box>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
        </form>
      </Form>
    </Box>
  );
};

export default AddNewPurchaseReceivedPage;

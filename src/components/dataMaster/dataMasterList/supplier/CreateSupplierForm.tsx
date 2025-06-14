import { type FORM_TYPE } from "@/constant";
import { type CustomerPayload } from "@/model/customer.model";
import { type SupplierPayload } from "@/model/supplier.model";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { type FC, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

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

interface IProps {
  data?: Partial<SupplierPayload>;
  onClose: (id: string) => void;
  type: FORM_TYPE;
}

const CreateSupplierForm: FC<IProps> = ({ onClose, type, data }) => {
  const { mutateAsync: createSupplier, isPending } =
    api.supplier.create.useMutation();

  const utils = api.useUtils();

  const form = useForm<CustomerPayload>({
    defaultValues: { nama: "" },
  });

  const onSubmit: SubmitHandler<CustomerPayload> = async ({ nama, alamat }) => {
    toast.promise(
      async () => {
        if (type === "CREATE") {
          return await createSupplier({
            nama,
            alamat,
          });
        }
      },
      {
        loading: "loading",
        success: async (data) => {
          onClose(data?.id ?? "");
          await utils.supplier.getInfinite.invalidate();
          return "berhasil membuat supplier baru";
        },
        error: errorFormatter,
      },
    );
  };

  useEffect(() => {
    form.reset({
      ...data,
    });
  }, [data]);

  return (
    <Form {...form}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit(onSubmit)(e);
        }}
        autoComplete="off"
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>nama supplier</FormLabel>
              <FormControl>
                <Input placeholder="masukan nama supplier..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alamat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>alamat</FormLabel>
              <FormControl>
                <Input
                  placeholder="masukan alamat"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isPending} type="submit" className="w-full">
          submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateSupplierForm;

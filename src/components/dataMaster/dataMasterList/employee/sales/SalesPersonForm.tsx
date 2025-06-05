import { type FORM_TYPE } from "@/constant";
import { type SalesPersonPayload } from "@/model/salesPerson.model";
import { api } from "@/trpc/react";
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
  data?: Partial<SalesPersonPayload>;
  onClose: (id: string) => void;
  type: FORM_TYPE;
}

const SalesPersonForm: FC<IProps> = ({ onClose, type, data }) => {
  const { mutateAsync: createSales, isPending } =
    api.salesPerson.create.useMutation();

  const utils = api.useUtils();

  const form = useForm<SalesPersonPayload>({
    defaultValues: { name: "" },
  });

  const onSubmit: SubmitHandler<SalesPersonPayload> = async ({ name }) => {
    toast.promise(
      async () => {
        if (type === "CREATE") {
          return await createSales({
            name,
          });
        }
      },
      {
        loading: "loading",
        success: async (data) => {
          onClose(data?.id ?? "");
          await utils.salesPerson.getInfinite.invalidate();
          return "berhasil membuat sales baru";
        },
        error: (e) => {
          if (e instanceof Error) {
            return e.message;
          }
        },
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>nama sales</FormLabel>
              <FormControl>
                <Input placeholder="nama sales..." {...field} />
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

export default SalesPersonForm;

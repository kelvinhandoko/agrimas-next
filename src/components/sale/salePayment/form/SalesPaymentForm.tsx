import { NUMERIC_PROPS } from "@/constant";
import {
  type SalesPaymentPayload,
  salesPaymentPayload,
} from "@/model/sales-payment.model";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, CreditCard, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const today = new Date();

interface SalesPaymentFormProps {
  sisaTagihan: number;
}

const SalesPaymentForm: FC<SalesPaymentFormProps> = ({ sisaTagihan }) => {
  console.log(sisaTagihan);
  const searchParams = useSearchParams();
  const salesInvoiceId = searchParams.get("salesInvoiceId") ?? "";
  const [isSubmitting, setIsSubmitting] = useState(false);

  // // Fetch payment methods
  const { data: paymentMethods, isLoading: loadingPaymentMethods } =
    api.paymentMethod.getInfinite.useQuery({});

  const form = useForm<SalesPaymentPayload>({
    resolver: zodResolver(salesPaymentPayload),
    defaultValues: {
      amount: 0,
      paymentMethodId: "",
      salesInvoiceId,
      date: new Date(),
    },
  });

  // Create payment mutation
  const createPayment = api.salesPayment.create.useMutation({
    onSuccess: () => {
      toast.success("Payment recorded successfully");
      form.reset({
        amount: 0,
        paymentMethodId: "",
        salesInvoiceId,
        date: today,
      });
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to record payment");
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: SalesPaymentPayload) => {
    setIsSubmitting(true);

    toast.promise(createPayment.mutateAsync(data), {
      loading: "Recording payment...",
      success: () => {
        form.reset({
          amount: 0,
          paymentMethodId: "",
          salesInvoiceId,
          date: today,
        });
        return "Payment recorded successfully";
      },
      error: errorFormatter,
    });

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (salesInvoiceId) {
      form.setValue("salesInvoiceId", salesInvoiceId);
    }
  }, [salesInvoiceId]);

  if (!salesInvoiceId)
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <CardTitle>-</CardTitle>
      </div>
    );

  if (sisaTagihan <= 0)
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <CardTitle>tagihan sudah lunas</CardTitle>
      </div>
    );
  return (
    <Card className="flex w-full flex-col lg:w-1/3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          form pembayaran
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Payment Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>tanggal pembayaran</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>pilih tanggal</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethodId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metode Pembayaran</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="pilih metode pembayaran" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loadingPaymentMethods ? (
                        <div className="flex items-center justify-center p-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      ) : (
                        paymentMethods?.data?.map((method) => (
                          <SelectItem key={method.id} value={method.id}>
                            {method.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>jumlah</FormLabel>
                  <FormControl>
                    <NumericFormat
                      value={field.value}
                      onValueChange={({ floatValue }) => {
                        field.onChange(floatValue);
                      }}
                      {...NUMERIC_PROPS}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto w-full gap-2"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {!isSubmitting && <Check className="h-4 w-4" />}
              tambah
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SalesPaymentForm;

"use client";

import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { api } from "@/trpc/react";
import {
  Calendar,
  CreditCard,
  Loader2,
  MapPin,
  ShoppingBag,
  Timer,
  User,
} from "lucide-react";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import { NumericFormat } from "react-number-format";

import SalesPaymentForm from "@/components/sale/salePayment/form/SalesPaymentForm";
import SalesInvoiceInput from "@/components/sale/salePayment/form/salesInvoiceInput";
import SalesPaymentTable from "@/components/sale/salePayment/table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SalesPaymentFormPage = () => {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("salesInvoiceId") ?? "";
  const { data, isLoading } = api.salesInvoice.getDetail.useQuery(invoiceId, {
    enabled: !!invoiceId,
  });

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="bg-primary/10 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold">
              Pembayaran Faktur Penjualan
            </h3>
            <SalesInvoiceInput />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : data ? (
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3">
                <User className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Customer
                  </p>
                  <p className="font-medium">{data.customer.nama}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Alamat
                  </p>
                  <p className="font-medium">{data.customer.alamat}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShoppingBag className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    sales
                  </p>
                  <p className="font-medium">{data.salesPerson.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tanggal Penjualan
                  </p>
                  <p className="font-medium">
                    {DateTime.fromJSDate(data.date).toFormat(DATE_FORMAT)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Timer className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Jatuh Tempo
                  </p>
                  <p className="font-medium">
                    {DateTime.fromJSDate(data.dueDate).toFormat(DATE_FORMAT)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Penjualan
                  </p>
                  <p className="font-medium">
                    <NumericFormat
                      value={data.totalAfter ?? 0}
                      {...NUMERIC_PROPS}
                      displayType="text"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Sisa Tagihan
                  </div>
                </div>
                <div className="text-xl font-bold text-primary">
                  <NumericFormat
                    value={(data.totalAfter ?? 0) - (data.totalPayment ?? 0)}
                    {...NUMERIC_PROPS}
                    displayType="text"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        ) : (
          <div className="p-6 text-center text-muted-foreground">
            Tidak ada faktur yang dipilih. Silakan pilih faktur untuk melihat
            detailnya.
          </div>
        )}
      </Card>

      <Tabs defaultValue="form">
        <TabsList>
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <div className="mt-6 lg:mt-0">
            <SalesPaymentForm
              sisaTagihan={(data?.totalAfter ?? 0) - (data?.totalPayment ?? 0)}
            />
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="mt-6 lg:mt-0">
            <SalesPaymentTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesPaymentFormPage;

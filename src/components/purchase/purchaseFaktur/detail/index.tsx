"use client";

import { DATE_FORMAT } from "@/constant";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { fallbackName } from "@/utils/fallback-name";
import { DateTime } from "luxon";
import { type FC } from "react";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import PurchasePaymentTable from "@/components/purchase/purchasePayment/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface IProps {
  id: string;
}

const DetailPurchaseFakturPage: FC<IProps> = ({ id }) => {
  const { data, isLoading, error } =
    api.purchaseInvoice.findDetail.useQuery(id);

  if (isLoading) return <LoadingIndicator />;

  if (!data || error) return <div>Error</div>;

  const {
    totalPayment,
    receiveItem: { ref, receiveDate },
    totalAfter,
    totalBefore,
    totalTax,
    totalDiscount,
  } = data;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto flex flex-1 flex-col space-y-6 p-6">
      <BackButton path={paths.purchase.purchaseFaktur.root} />
      <div className="flex flex-1 justify-between gap-2">
        <div className="flex-[4] space-y-4">
          <Card>
            <CardHeader>
              <Badge className="ml-auto w-fit" colorScheme={data.paymentStatus}>
                {data.paymentStatus}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-x-3">
                <Avatar>
                  <AvatarFallback>
                    {fallbackName(data.receiveItem.purchase.supplier.nama)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>
                    {data.receiveItem.purchase.supplier.nama}
                  </CardTitle>
                  <CardDescription>
                    {data.receiveItem.purchase.supplier.alamat}
                  </CardDescription>
                </div>
              </div>
              <div className="CardTitle-primary-foreground mt-3 rounded-lg bg-[#624DE3] px-4 py-7">
                <div className="flex flex-col justify-between gap-2">
                  <CardTitle className="text-background">
                    No Penjualan
                  </CardTitle>
                  <CardTitle className="text-background">{data.ref}</CardTitle>
                  <CardTitle className="text-background">
                    Tanggal Faktur:{" "}
                    {DateTime.fromJSDate(data.date).toFormat(DATE_FORMAT)}
                  </CardTitle>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <PurchasePaymentTable purchaseId={data.id} />
          </Card>
        </div>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Ringkasan Pembayaran</CardTitle>
            <CardDescription>Detail finansial faktur</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm font-medium">
                  {formatCurrency(totalBefore)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Diskon</span>
                <span className="text-sm font-medium text-green-600">
                  -{formatCurrency(totalDiscount)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pajak</span>
                <span className="text-sm font-medium">
                  {formatCurrency(totalTax)}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-base font-semibold">Total</span>
                <span className="text-base font-bold">
                  {formatCurrency(totalAfter)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Dibayar</span>
                <span className="text-sm font-medium text-blue-600">
                  {formatCurrency(totalPayment)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sisa</span>
                <span className="text-sm font-medium text-red-600">
                  {formatCurrency(totalAfter - totalPayment)}
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">No. Penerimaan</span>
                <span className="font-medium">{ref}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tanggal Terima</span>
                <span className="font-medium">
                  {DateTime.fromJSDate(receiveDate).toFormat(DATE_FORMAT)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailPurchaseFakturPage;

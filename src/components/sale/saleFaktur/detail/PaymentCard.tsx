"use client";

import { DATE_FORMAT } from "@/constant";
import { DateTime } from "luxon";
import { type FC } from "react";
import { NumericFormat } from "react-number-format";

import { type SalesInvoiceRouterOutput } from "@/server/salesInvoice/sales-invoice.router";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentCardProps {
  data: SalesInvoiceRouterOutput["getDetail"]["SalesPayment"][number];
}

const PaymentCard: FC<PaymentCardProps> = ({ data }) => {
  const {
    amount,
    paymentMethod: { accountNumber, name },
    date,
  } = data;

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm">Metode Pembayaran</CardTitle>
        <Badge variant="outline">{name}</Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>No Rekening:</span>
          <span className="font-medium">{accountNumber}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tanggal Pembayaran:</span>
          <span className="font-medium">
            {DateTime.fromJSDate(date).toFormat(DATE_FORMAT)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Jumlah:</span>
          <span className="font-semibold text-primary">
            <NumericFormat
              value={amount}
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
            />
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;

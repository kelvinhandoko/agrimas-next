"use client";

import { type SalesPaymentPayload } from "@/model/sales-payment.model";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import SalesInvoiceInput from "@/components/sale/salePayment/form/salesInvoiceInput";
import SalesPaymentTable from "@/components/sale/salePayment/table";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SalesPaymentForm = () => {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("invoiceId") ?? "";
  const { data, isLoading } = api.salesInvoice.getDetail.useQuery(invoiceId, {
    enabled: !!invoiceId,
  });

  const form = useForm<SalesPaymentPayload>();

  return (
    <div>
      <p>hi</p>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Form {...form}>
            <form>
              <SalesInvoiceInput form={form} />
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="password">
          <SalesPaymentTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesPaymentForm;

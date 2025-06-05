"use client";

import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { fallbackName } from "@/utils/fallback-name";
import { splitText } from "@/utils/formatter/stringFormatter";
import { Box, Grid, Text } from "@radix-ui/themes";
import { DateTime } from "luxon";
import { NumericFormat } from "react-number-format";

import BackButton from "@/components/BackButton";
import PaymentCard from "@/components/sale/saleFaktur/detail/PaymentCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DetailSaleFakturPage = ({ id }: { id: string }) => {
  const { data } = api.salesInvoice.getDetail.useQuery(id);

  if (!data) return null;
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.sale.saleFaktur.root} />
      </Box>
      <Grid columns={{ initial: "1", md: "12" }} gapX={"5"}>
        <Grid className="md:col-span-8">
          <Card className="px-6 py-4">
            <CardContent>
              <Box className="flex justify-end">
                <Badge variant="success">
                  {splitText(data?.status as string)}
                </Badge>
              </Box>
              <Box className="mt-4 flex items-center justify-between">
                <Box className="flex items-center gap-x-3">
                  <Avatar className="h-[70px] w-[70px]">
                    <AvatarFallback>
                      {fallbackName(data.customer.nama)}
                    </AvatarFallback>
                  </Avatar>
                  <Box>
                    <Text size={"5"} weight={"bold"}>
                      {data.customer.nama}
                    </Text>
                  </Box>
                </Box>
                <Text size={"2"} align={"right"} className="w-[30%]">
                  {data.customer.alamat}
                </Text>
              </Box>
              <Box className="mt-3 rounded-lg bg-[#624DE3] px-4 py-7 text-primary-foreground">
                <Box className="flex justify-between">
                  <Box>
                    <Text weight={"bold"}>No Penjualan</Text>
                    <Box>
                      <Text size={"2"}>{data.ref}</Text>
                    </Box>
                    <Box>
                      <Text size={"2"}>
                        Tanggal Penjualan:{" "}
                        {DateTime.fromJSDate(data.date).toFormat(DATE_FORMAT)}
                      </Text>
                    </Box>
                    <Box>
                      <Text size={"2"}>
                        Tanggal Jatuh Tempo:{" "}
                        {DateTime.fromJSDate(data.dueDate).toFormat(
                          DATE_FORMAT,
                        )}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="max-w-[40%] text-end">
                    <Text weight={"bold"}>Sales</Text>
                    <Box>
                      <Text size={"2"}>{data.salesPerson.name}</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className="mt-5">
                <Text weight={"bold"}>Detail Barang</Text>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[5ch]">No</TableHead>
                      <TableHead>produk</TableHead>
                      <TableHead className="w-[10ch]">quantity</TableHead>
                      <TableHead className="w-[20ch]">harga</TableHead>
                      <TableHead className="w-[20ch]">diskon</TableHead>
                      <TableHead className="w-[20ch]">pajak</TableHead>
                      <TableHead className="w-[25ch]">total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.salesInvoiceDetail.map((detail, index) => (
                      <TableRow key={detail.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{detail.product.name}</TableCell>
                        <TableCell>{detail.quantity}</TableCell>
                        <TableCell>
                          <NumericFormat
                            value={detail.price}
                            {...NUMERIC_PROPS}
                            displayType="text"
                          />
                        </TableCell>
                        <TableCell>
                          <NumericFormat
                            value={detail.discount}
                            {...NUMERIC_PROPS}
                            displayType="text"
                          />
                        </TableCell>
                        <TableCell>
                          <NumericFormat
                            value={detail.tax}
                            {...NUMERIC_PROPS}
                            displayType="text"
                          />
                        </TableCell>
                        <TableCell>
                          <NumericFormat
                            value={detail.totalAfter}
                            {...NUMERIC_PROPS}
                            displayType="text"
                          />
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={5}></TableCell>
                      <TableCell>Sub Total</TableCell>
                      <TableCell>
                        <NumericFormat
                          value={data.totalBefore}
                          {...NUMERIC_PROPS}
                          displayType="text"
                        />
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}></TableCell>
                      <TableCell>Diskon</TableCell>
                      <TableCell>
                        <NumericFormat
                          value={data.discount}
                          {...NUMERIC_PROPS}
                          displayType="text"
                        />
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}></TableCell>
                      <TableCell>Pajak</TableCell>
                      <TableCell>
                        <NumericFormat
                          value={data.tax}
                          {...NUMERIC_PROPS}
                          displayType="text"
                        />
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}></TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>
                        <NumericFormat
                          value={data.totalAfter}
                          {...NUMERIC_PROPS}
                          displayType="text"
                        />
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid className="h-max md:col-span-4">
          <Card className="h-fit px-6 py-4">
            <CardHeader>
              <CardTitle>Detail Pembayaran</CardTitle>
            </CardHeader>
            <hr />
            <CardContent>
              {data.SalesPayment.length ? (
                data.SalesPayment.map((data, key) => (
                  <PaymentCard data={data} key={key} />
                ))
              ) : (
                <p>belum ada data</p>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailSaleFakturPage;

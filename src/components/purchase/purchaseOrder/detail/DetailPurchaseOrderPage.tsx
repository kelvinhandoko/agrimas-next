"use client";

import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { fallbackName } from "@/utils/fallback-name";
import { Box, Grid, Text } from "@radix-ui/themes";
import { DateTime } from "luxon";
import { NumericFormat } from "react-number-format";

import BackButton from "@/components/BackButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

import { TableDetailPurchaseOrder } from "./TableDetailPurchaseOrder";

interface DetailPurchaseOrderProps {
  id: string;
}

const DetailPurchaseOrderPage = ({ id }: DetailPurchaseOrderProps) => {
  const { data, isLoading } = api.purchase.getDetail.useQuery(id);
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.purchaseOrder.root} />
      </Box>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
      <Grid columns={{ initial: "1", md: "12" }} gapX={"5"}>
        <Grid className="md:col-span-8">
          <Card className="px-6 py-4">
            <CardContent>
              <Box className="mt-4 flex items-center justify-between">
                <Box className="flex items-center gap-x-3">
                  <Avatar className="h-[70px] w-[70px]">
                    <AvatarFallback>{fallbackName("name")}</AvatarFallback>
                  </Avatar>
                  <Box>
                    <Text size={"5"} weight={"bold"}>
                      {data?.company.name}
                    </Text>
                  </Box>
                </Box>
                <Text size={"2"} align={"right"} className="w-[30%]">
                  {data?.company.address}
                </Text>
              </Box>
              <Box className="mt-3 rounded-lg bg-[#624DE3] px-4 py-7 text-primary-foreground">
                <Box className="flex justify-between">
                  <Box>
                    <Text weight={"bold"}>No Pembelian</Text>
                    <Box>
                      <Text size={"2"}>{data?.ref}</Text>
                    </Box>
                    <Box>
                      <Text size="2">
                        Tanggal Pembelian:{" "}
                        {data?.purchaseDate
                          ? DateTime.fromJSDate(data.purchaseDate).toFormat(
                              DATE_FORMAT,
                            )
                          : "-"}
                      </Text>
                    </Box>
                    <Box>
                      <Text size="2">
                        Tanggal Pembelian:{" "}
                        {data?.purchaseDate
                          ? DateTime.fromJSDate(data.dueDate).toFormat(
                              DATE_FORMAT,
                            )
                          : "-"}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="max-w-[40%] text-end">
                    <Text weight={"bold"}>Supplier</Text>
                    <Box>
                      <Text size={"2"}>{data?.supplier.nama}</Text>
                    </Box>
                    <Text size={"2"} className="text-end">
                      {data?.supplier.alamat}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box className="mt-5">
                <Text weight={"bold"}>Detail Barang</Text>
                <Box className="mt-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[5ch]">No</TableHead>
                        <TableHead>produk</TableHead>
                        <TableHead className="w-[10ch]">quantity</TableHead>
                        <TableHead className="w-[20ch]">harga</TableHead>
                        <TableHead className="w-[20ch]">diskon</TableHead>
                        <TableHead className="w-[20ch]">ppn</TableHead>
                        <TableHead className="w-[25ch]">total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.purchaseDetail.map((detail, index) => (
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
                              value={detail.ppn}
                              {...NUMERIC_PROPS}
                              displayType="text"
                            />
                          </TableCell>
                          <TableCell>
                            <NumericFormat
                              value={detail.netTotal}
                              {...NUMERIC_PROPS}
                              displayType="text"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={5}></TableCell>
                        <TableCell>Sub Total</TableCell>
                        <TableCell>
                          {/* <NumericFormat
                            value={data.netTotal}
                            {...NUMERIC_PROPS}
                            displayType="text"
                          /> */}
                          0
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={5}></TableCell>
                        <TableCell>Diskon</TableCell>
                        <TableCell>
                          {/* <NumericFormat
                            value={data.discount}
                            {...NUMERIC_PROPS}
                            displayType="text"
                          /> */}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={5}></TableCell>
                        <TableCell>Pajak</TableCell>
                        <TableCell>
                          {/* <NumericFormat
                            value={data.tax}
                            {...NUMERIC_PROPS}
                            displayType="text"
                          /> */}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={5}></TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>
                          {/* <NumericFormat
                            value={data.totalAfter}
                            {...NUMERIC_PROPS}
                            displayType="text"
                          /> */}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid className="h-max md:col-span-4">
          <Card className="h-fit px-6 py-4">
            <CardHeader>
              <CardTitle>Detail Supplier</CardTitle>
            </CardHeader>
            <hr />
            <CardContent>
              <Box className="flex items-center gap-x-3">
                <Avatar className="h-[70px] w-[70px]">
                  <AvatarFallback>{fallbackName("name")}</AvatarFallback>
                </Avatar>
                <Box>
                  <Text size={"5"} weight={"bold"}>
                    {"name"}
                  </Text>
                  <Box>
                    <Text>{"email@gmail.com"}</Text>
                  </Box>
                </Box>
              </Box>
              <hr className="my-3" />
              <Text size={"2"}>
                Tj. Sari, Kec. Medan Selayang, Kota Medan, Sumatera Utara 20154
              </Text>
              <Box>
                <Button className="mt-3 w-full" size={"lg"}>
                  Download Invoice
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailPurchaseOrderPage;

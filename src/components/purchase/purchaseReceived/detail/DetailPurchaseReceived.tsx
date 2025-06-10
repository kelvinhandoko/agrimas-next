"use client";

import { DATE_FORMAT } from "@/constant";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { fallbackName } from "@/utils/fallback-name";
import { Box, Grid, Text } from "@radix-ui/themes";
import { pdf } from "@react-pdf/renderer";
import { DateTime } from "luxon";

import BackButton from "@/components/BackButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SuratJalanPDF from "./SuratJalan";

interface DetailPurcaseReceivedProps {
  id: string;
}

const DetailPurcaseReceived = ({ id }: DetailPurcaseReceivedProps) => {
  const { data, isLoading } = api.receiveItem.getDetail.useQuery(id);

  const handleDownloadPDF = async () => {
    const blob = await pdf(<SuratJalanPDF data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const nameFile = `Surat-Jalan-${data?.purchase?.supplier?.nama}-${data?.ref}`;
    link.href = url;
    link.download = `${nameFile}.pdf`;
    link.click();
  };
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.purchaseReceived.root} />
      </Box>
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
                      {"name company"}
                    </Text>
                    <Box>
                      <Text>{"email@gmail.com"}</Text>
                    </Box>
                  </Box>
                </Box>
                <Text size={"2"} align={"right"} className="w-[30%]">
                  Tj. Sari, Kec. Medan Selayang, Kota Medan, Sumatera Utara
                  20154
                </Text>
              </Box>
              <Box className="mt-3 rounded-lg bg-[#624DE3] px-4 py-7 text-primary-foreground">
                <Box className="flex justify-between">
                  <Box>
                    <Text weight={"bold"}>No Penerimaan</Text>
                    <Box>
                      <Text size={"2"}>{data?.ref}</Text>
                    </Box>
                    <Box className="mt-2">
                      <Text weight={"bold"}>No Pembelian</Text>
                      <Box>
                        <Text size={"2"}>{data?.purchase?.ref}</Text>
                      </Box>
                    </Box>
                    <Box>
                      <Text size={"2"}>
                        Tanggal Pembelian:{" "}
                        {data?.purchase?.purchaseDate
                          ? DateTime.fromJSDate(
                              data?.purchase?.purchaseDate,
                            ).toFormat(DATE_FORMAT)
                          : "-"}
                      </Text>
                    </Box>
                    <Box>
                      <Text size={"2"}>
                        Tanggal Penerimaan:{" "}
                        {data?.receiveDate
                          ? DateTime.fromJSDate(data?.receiveDate).toFormat(
                              DATE_FORMAT,
                            )
                          : "-"}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="max-w-[40%] text-end">
                    <Text weight={"bold"}>Supplier</Text>
                    <Box>
                      <Text size={"2"}>{data?.purchase?.supplier?.nama}</Text>
                    </Box>
                    <Text size={"2"} className="text-end">
                      {data?.purchase?.supplier?.alamat}
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
                        <TableHead className="w-[15ch]">No</TableHead>
                        <TableHead>Nama Barang</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.receiveItemDetail.map((detail, index) => (
                        <TableRow key={detail.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {detail.purchaseDetail.product.name}
                          </TableCell>
                          <TableCell>{detail.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
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
                    {data?.purchase?.supplier?.nama}
                  </Text>
                </Box>
              </Box>
              <hr className="my-3" />
              <Text size={"2"}>{data?.purchase?.supplier?.alamat}</Text>
              <Box>
                <Button
                  className="mt-3 w-full"
                  size={"lg"}
                  onClick={handleDownloadPDF}
                  disabled={isLoading}
                >
                  Download Surat Jalan
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailPurcaseReceived;

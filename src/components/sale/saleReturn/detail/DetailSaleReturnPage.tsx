"use client";

import { paths } from "@/paths/paths";
import { fallbackName } from "@/utils/fallback-name";
import { handleSimulationPromise } from "@/utils/promise-simulation";
import { Box, Grid, Text } from "@radix-ui/themes";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DetailSaleReturnPage = ({ id }: { id: string }) => {
  const handleDownloadInvoice = () => {
    handleSimulationPromise({
      loading: "Downloading",
      success: "Invoice berhasil diunduh! (just simulation)",
      error: "Gagal mengunduh invoice! (just simulation)",
    });
  };

  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.sale.saleReturn.root} />
      </Box>
      <Grid columns={{ initial: "1", md: "12" }} gapX={"5"}>
        <Grid className="md:col-span-8">
          <Card className="px-6 py-4">
            <CardContent>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-x-3">
                  <Avatar className="h-[70px] w-[70px]">
                    <AvatarFallback>{fallbackName("name")}</AvatarFallback>
                  </Avatar>
                  <Box>
                    <Text size={"5"} weight={"bold"}>
                      {"name"}
                    </Text>
                    <Box>
                      <Text>{"email"}</Text>
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
                    <Box>
                      <Text weight={"bold"}>No Pengembalian</Text>
                    </Box>
                    <Box>
                      <Text size={"2"}>INV-2024-01012</Text>
                    </Box>
                    <Box className="mt-5">
                      <Text weight={"bold"}>No Penjualan</Text>
                      <Box>
                        <Text size={"2"}>INV-2024-01012</Text>
                      </Box>
                      <Box>
                        <Text size={"2"}>
                          Tanggal Penjualan: 10 Desember 2024
                        </Text>
                      </Box>
                      <Box>
                        <Text size={"2"}>
                          Tanggal Jatuh Tempo: 10 Desember 2024
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="max-w-[40%] text-end">
                    <Text weight={"bold"}>Customer</Text>
                    <Box>
                      <Text size={"2"}>Wiktoria</Text>
                    </Box>
                    <Text size={"2"} className="text-end">
                      Tj. Sari, Kec. Medan Selayang, Kota Medan, Sumatera Utara
                      20154
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box className="mt-5">
                <Text weight={"bold"}>Detail Barang</Text>
                <Grid
                  columns={{ initial: "1", md: "3" }}
                  gap="4"
                  className="mt-3"
                >
                  <Label htmlFor="email">Kode Barang</Label>
                  <Label htmlFor="email">Nama Barang</Label>
                  <Label htmlFor="email">Qty</Label>
                </Grid>
                {Array.from({ length: 3 }).map((v, i) => (
                  <Grid
                    columns={{ initial: "1", md: "3" }}
                    gap="4"
                    className="mt-3"
                    key={i}
                  >
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Input
                        type="text"
                        id="email"
                        value={`kode-barang-${i + 1}00`}
                        readOnly
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Input
                        type="text"
                        id="email"
                        value={`nama-barang-${i + 1}00`}
                        readOnly
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Input type="number" id="email" value={i + 1} readOnly />
                    </div>
                  </Grid>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid className="h-max md:col-span-4">
          <Card className="h-fit px-6 py-4">
            <CardHeader>
              <CardTitle>Detail Customer</CardTitle>
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
                    <Text>{"email"}</Text>
                  </Box>
                </Box>
              </Box>
              <hr className="my-3" />
              <Text size={"2"}>
                Tj. Sari, Kec. Medan Selayang, Kota Medan, Sumatera Utara 20154
              </Text>
              <Box>
                <Button
                  className="mt-3 w-full"
                  size={"lg"}
                  onClick={handleDownloadInvoice}
                >
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

export default DetailSaleReturnPage;

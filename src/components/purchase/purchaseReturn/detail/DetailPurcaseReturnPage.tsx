import { paths } from "@/paths/paths";
import { fallbackName } from "@/utils/fallback-name";
import { Box, Grid, Text } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TableDetailPurchaseReturn } from "./TableDetailPurchaseReturn";

interface DetailPurcaseReturnPageProps {
  id: string;
}

const DetailPurcaseReturnPage = ({ id }: DetailPurcaseReturnPageProps) => {
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.purchaseReturn.root} />
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
                    <Text weight={"bold"}>No Pengembalian</Text>
                    <Box>
                      <Text size={"2"}>INV-2024-01012</Text>
                    </Box>
                    <Box className="mt-2">
                      <Text weight={"bold"}>No Pembelian</Text>
                      <Box>
                        <Text size={"2"}>INV-2024-01012</Text>
                      </Box>
                    </Box>
                    <Box>
                      <Text size={"2"}>
                        Tanggal Penjualan: 10 Desember 2024
                      </Text>
                    </Box>
                    <Box>
                      <Text size={"2"}>
                        Tanggal Pengembalian: 10 Desember 2024
                      </Text>
                    </Box>
                  </Box>
                  <Box className="max-w-[40%] text-end">
                    <Text weight={"bold"}>Supplier</Text>
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
                <Box className="mt-3">
                  <TableDetailPurchaseReturn />
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

export default DetailPurcaseReturnPage;

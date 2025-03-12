"use client";

import { LIMIT } from "@/constant";
import { dummyAccountResponse } from "@/data/dummyAccountResponse";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box, Flex } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import BackButton from "../BackButton";
import { Button } from "../ui/button";

const AccountantPage = () => {
  // const { data, isLoading } = api.account.getAll.useInfiniteQuery({
  //   infiniteScroll: true,
  //   limit:LIMIT
  // });

  // console.log(data);

  return (
    <Box>
      <Box>
        <BackButton path={paths.accountant.root} />
      </Box>
      <Flex justify={"between"} align={"center"} className="my-3">
        <h2 className="text-2xl font-bold tracking-tight">Daftar Akun</h2>
        <Link href={paths.accountant.newAccount}>
          <Button>
            <PlusIcon />
            Tambah Akun
          </Button>
        </Link>
      </Flex>
      <Box className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-auto">Kode Akun</TableHead>
              <TableHead className="w-auto">Type</TableHead>
              <TableHead>Nama Akun</TableHead>
              <TableHead className="text-right">Kode Parent Akun</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyAccountResponse.map((account, index) => (
              <TableRow
                key={index}
                className={`ps-3 ${account.parent == undefined ? "bg-[#624DE3] font-bold text-primary-foreground hover:bg-[#624DE3] hover:text-primary-foreground" : ""}`}
              >
                <TableCell
                  style={{
                    paddingLeft: `${account.level > 0 ? account.level * 20 : 10}px`,
                  }}
                >
                  {account.code}
                </TableCell>
                <TableCell style={{ paddingLeft: `${account.level * 20}px` }}>
                  {account.type}
                </TableCell>
                <TableCell style={{ paddingLeft: `${account.level * 20}px` }}>
                  {account.name}
                </TableCell>
                <TableCell
                  className={`text-right`}
                  style={{ paddingLeft: `${account.level * 20}px` }}
                >
                  {account.parent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default AccountantPage;

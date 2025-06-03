"use client";

import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";

const JournalTable = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const search = searchParams.get("search") ?? "";
  const groupAccountId = searchParams.get("groupAccountId") ?? "";
  const [open, setOpen] = useState(false);
  const { data, isLoading } = api.journal.get.useQuery({
    page,
    limit,
    search,
    groupAccountId,
  });
  return (
    <>
      <Box>
        <Box className="mb-8">
          <BackButton path={paths.accountant.root} />
        </Box>
        <DataTable
          columns={JournalColumn()}
          data={data?.data ?? []}
          onAddNew={() => setOpen(true)}
          searchAble
          isLoading={isLoading}
          totalData={data?.meta.totalCount ?? 0}
          totalPage={data?.meta.pageCount ?? 0}
          searchPlaceholder="cari akun"
          buttonAddName="Tambah akun"
          titleTable="Daftar akun"
        />
      </Box>
      <DialogWrapper
        className="w-xl"
        title="form nama akun"
        open={open}
        onOpenChange={setOpen}
      >
        <AccountForm onClose={() => setOpen(false)} />
      </DialogWrapper>
    </>
  );
};

export default JournalTable;

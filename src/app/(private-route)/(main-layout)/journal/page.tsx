import { HydrateClient, api } from "@/trpc/server";
import Link from "next/link";

import JournalList from "@/components/journal/JournalList";
import { Button } from "@/components/ui/button";

const form = async () => {
  await api.journal.getAll.prefetch({});
  return (
    <HydrateClient>
      <div className="mx-auto w-[min(95%,1440px)] space-y-4 p-8">
        <Link href={"/journal/form"}>
          <Button>tambah jurnal baru</Button>
        </Link>
        <JournalList />
      </div>
    </HydrateClient>
  );
};

export default form;

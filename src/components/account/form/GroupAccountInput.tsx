"use client";
import { LIMIT } from "@/constant";
import { useDebounce } from "@/hooks/use-debounce";
import { type AccountPayload } from "@/server/account";
import { api } from "@/trpc/react";
import { useState, type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useInView } from "react-intersection-observer";

interface GroupAccountInputProps {
  form: UseFormReturn<AccountPayload>;
}

const GroupAccountInput: FC<GroupAccountInputProps> = ({ form }) => {
  // hooks
  const [searchGroupAccount, setGroupAccount] = useState("");

  const debounceSearch = useDebounce(searchGroupAccount, 200);

  const { ref, inView } = useInView();

  //apis
  const {
    data: groupAccountData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = api.groupAccount.getAll.useInfiniteQuery({
    infiniteScroll: true,
    limit: LIMIT,
    search: debounceSearch,
  });
  const groupAccounts =
    groupAccountData?.pages.flatMap((page) => page.data) ?? [];

  return <div>GroupAccountInput</div>;
};

export default GroupAccountInput;

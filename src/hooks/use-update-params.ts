"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useUpdateParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as unknown as string);

    if (value) {
      params.set(key, value);
      // Only reset the page if the key is not "page"
      if (key !== "page") {
        params.set("page", "1");
      }
    } else {
      params.delete(key); // Remove the param if no value is provided
    }

    // Update the route with new params
    router.replace(`${pathname}?${params.toString()}`);
  };

  const deleteParams = (key: string) => {
    const params = new URLSearchParams(searchParams as unknown as string);
    params.delete(key);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { updateParams, deleteParams };
};

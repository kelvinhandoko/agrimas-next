import { Flex } from "@radix-ui/themes";
import { LoaderCircleIcon } from "lucide-react";
import React from "react";

const LoadingIndicator = () => {
  return (
    <Flex justify={"center"} align={"center"} height={"80vh"}>
      <LoaderCircleIcon className="h-16 w-16 animate-spin" />
    </Flex>
  );
};

export default LoadingIndicator;

import { Flex, Text } from "@radix-ui/themes";
import React from "react";

const LoadingIndicator = () => {
  return (
    <Flex justify={"center"} align={"center"} height={"80vh"}>
      <Text>loading....</Text>
    </Flex>
  );
};

export default LoadingIndicator;

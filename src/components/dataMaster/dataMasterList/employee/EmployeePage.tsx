import { paths } from "@/paths/paths";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SalesDataTable from "./sales/SalesDataTable";
import UserDataTable from "./user/UserDataTable";

const EmployeePage = () => {
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.root} />
      </Box>
      <Tabs defaultValue="user" className="w-[100%]">
        <TabsList>
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <Box className="mt-4">
            <UserDataTable />
          </Box>
        </TabsContent>
        <TabsContent value="sales">
          <Box className="mt-4">
            <SalesDataTable />
          </Box>
        </TabsContent>
      </Tabs>
    </Box>
  );
};

export default EmployeePage;

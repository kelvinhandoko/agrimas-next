import { paths } from "@/paths/paths";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";

import JournalDataTable from "./JournalDataTable";

const JournalPage = () => {
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.accountant.root} />
      </Box>
      <Box>
        <JournalDataTable />
      </Box>
    </Box>
  );
};

export default JournalPage;

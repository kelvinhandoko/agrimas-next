import { paths } from "@/paths/paths";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";

const NewJournalPage = () => {
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.accountant.root} />
      </Box>
      <Box>new form journal page</Box>
    </Box>
  );
};

export default NewJournalPage;

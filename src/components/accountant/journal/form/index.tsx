"use client";

import { type FORM_TYPE } from "@/constant";
import { api } from "@/trpc/react";
import { type FC } from "react";

interface JournalFormProps {
  type?: FORM_TYPE;
}

const JournalForm: FC<JournalFormProps> = ({ type = "CREATE" }) => {
  const utils = api.useUtils();
  const { mutateAsync } = api.journal.create.useMutation();
  return <div>JournalForm</div>;
};

export default JournalForm;

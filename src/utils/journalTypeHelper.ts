import { type JournalType } from "@prisma/client";

export const convertType = (type: JournalType) => {
  switch (true) {
    case type === "ADJUSTING":
      return "AJP";
    case type === "CLOSING":
      return "JP";
    case type === "REVERSING":
      return "RE";
    case type === "GENERAL":
      return "JU";
    default:
      break;
  }
};

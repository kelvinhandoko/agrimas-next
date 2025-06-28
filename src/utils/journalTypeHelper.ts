import { type JournalType } from "@prisma/client";

export const convertType = (type: JournalType): string => {
  switch (true) {
    case type === "ADJUSTING":
      return "JURNAL PENYESUAIAN";
    case type === "CLOSING":
      return "JURNAL PENUTUP";
    case type === "REVERSING":
      return "JURNAL PEMBALIK";
    case type === "GENERAL":
      return "JURNAL UMUM";
    default:
      return "JURNAL UMUM";
  }
};

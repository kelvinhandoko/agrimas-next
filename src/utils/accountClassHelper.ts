import { type AccountClass } from "@prisma/client";

export const convertAccountClass = (accountClass: AccountClass) => {
  switch (true) {
    case accountClass === "ASSET":
      return "aset";
    case accountClass === "LIABILITY":
      return "liabilitas";
    case accountClass === "EQUITY":
      return "modal";
    case accountClass === "REVENUE":
      return "pendapatan";
    case accountClass === "EXPENSE":
      return "beban";
    default:
      break;
  }
};

export enum AccountClassOrder {
  ASSET = 1,
  LIABILITY = 2,
  EQUITY = 3,
  REVENUE = 4,
  EXPENSE = 5,
}

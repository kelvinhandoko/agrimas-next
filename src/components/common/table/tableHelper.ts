import { type ColumnMeta } from "@tanstack/react-table";

export const columnAlign = (meta?: ColumnMeta<unknown, unknown>) => {
  if (!meta?.style?.textAlign) return;
  switch (meta.style.textAlign) {
    case "center":
      return "text-center";
    case "right":
      return "text-end";
    default:
      return "text-left";
  }
};

import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    style: {
      textAlign: "left" | "center" | "right";
    };
  }
}

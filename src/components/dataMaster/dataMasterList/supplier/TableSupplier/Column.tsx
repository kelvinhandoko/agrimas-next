"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

export type Supplier = {
  id: string;
  no: number;
  name: string;
  address: string;
};

export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "no",
    header: "No",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { id } = row.original; // Access the 'id' of the current row data
      return (
        <div className="flex gap-2">
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      );
    },
  },
];

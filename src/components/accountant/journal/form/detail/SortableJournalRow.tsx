"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type JournalPayload } from "@/model";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { type FC } from "react";
import { type FieldArrayWithId, type UseFormReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import AccountInput from "@/components/accountant/journal/form/detail/AccountInput";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TableCell, TableRow } from "@/components/ui/table";

interface SortableJournalRowProps {
  field: FieldArrayWithId<JournalPayload, "details", "uid">;
  index: number;
  form: UseFormReturn<JournalPayload>;
  onRemove: (index: number) => void;
}

const SortableJournalRow: FC<SortableJournalRowProps> = ({
  field,
  index,
  form,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.uid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={isDragging ? "bg-muted/50" : ""}
    >
      <TableCell className="w-12">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 cursor-grab touch-none p-0 hover:bg-muted active:cursor-grabbing"
            {...attributes}
            {...listeners}
            type="button"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <AccountInput form={form} index={index} />
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`details.${index}.debit`}
          render={({ field }) => (
            <FormItem className="flex flex-col items-start justify-start gap-2">
              <FormControl>
                <NumericFormat
                  placeholder="masukan jumlah"
                  value={field.value === 0 ? "" : field.value}
                  onValueChange={({ floatValue }) =>
                    field.onChange(floatValue || 0)
                  }
                  {...NUMERIC_PROPS}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`details.${index}.credit`}
          render={({ field }) => (
            <FormItem className="flex flex-col items-start justify-start gap-2">
              <FormControl>
                <NumericFormat
                  placeholder="masukan jumlah"
                  value={field.value === 0 ? "" : field.value}
                  onValueChange={({ floatValue }) =>
                    field.onChange(floatValue || 0)
                  }
                  {...NUMERIC_PROPS}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="w-16">
        <Button
          onClick={() => onRemove(index)}
          variant="destructive"
          size="icon"
          className="h-8 w-8"
          type="button"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default SortableJournalRow;

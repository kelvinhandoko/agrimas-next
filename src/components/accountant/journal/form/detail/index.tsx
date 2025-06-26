"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type JournalPayload } from "@/model";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import SortableJournalRow from "@/components/accountant/journal/form/detail/SortableJournalRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface JournalDetailFormProps {
  form: UseFormReturn<JournalPayload>;
  isFormLoading: boolean;
}

const JournalDetailForm: FC<JournalDetailFormProps> = ({
  form,
  isFormLoading,
}) => {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "details",
    keyName: "uid",
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.uid === active.id);
      const newIndex = fields.findIndex((field) => field.uid === over?.id);

      // Use react-hook-form's move function to maintain form state
      move(oldIndex, newIndex);
    }
  };

  const { creditTotal, debitTotal } = form.watch("details")?.reduce(
    (acc, curr) => {
      acc.debitTotal += curr.debit || 0;
      acc.creditTotal += curr.credit || 0;
      return acc;
    },
    { debitTotal: 0, creditTotal: 0 },
  ) ?? { debitTotal: 0, creditTotal: 0 };

  return (
    <Card>
      <CardContent className="p-0">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[8ch]"></TableHead>
                <TableHead>Akun Perkiraan</TableHead>
                <TableHead className="w-[20ch]">Debet</TableHead>
                <TableHead className="w-[20ch]">Kredit</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <SortableContext
                items={fields.map((field) => field.uid)}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, index) => (
                  <SortableJournalRow
                    key={field.uid}
                    field={field}
                    index={index}
                    form={form}
                    onRemove={remove}
                  />
                ))}
              </SortableContext>

              <TableRow>
                <TableCell colSpan={5} className="p-4">
                  <Button
                    className="w-full"
                    onClick={() =>
                      append({
                        accountId: "",
                        debit: 0,
                        credit: 0,
                      })
                    }
                    disabled={isFormLoading}
                    type="button"
                    variant="outline"
                  >
                    + Tambah Detail
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>

            <TableFooter>
              <TableRow className="bg-muted/50">
                <TableCell colSpan={2} className="font-medium">
                  Total
                </TableCell>
                <TableCell className="font-medium">
                  <NumericFormat
                    value={debitTotal}
                    {...NUMERIC_PROPS}
                    displayType="text"
                    className="font-medium"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <NumericFormat
                    value={creditTotal}
                    {...NUMERIC_PROPS}
                    displayType="text"
                    className="font-medium"
                  />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </DndContext>
      </CardContent>
    </Card>
  );
};

export default JournalDetailForm;

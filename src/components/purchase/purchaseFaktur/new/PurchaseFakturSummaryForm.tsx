import { PurchasePayload } from "@/model/purchase.model";
import { formatPrice } from "@/utils/format-price";
import { Box, Grid, Text } from "@radix-ui/themes";
import { ChangeEvent } from "react";
import { Control, UseFormSetValue } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PurchaseOrderRowProps {
  control: Control<PurchasePayload>;
  subTotal: number;
  totalAll: number;
  setValue: UseFormSetValue<PurchasePayload>;
}
const PurchaseFakturSummaryForm = ({
  control,
  subTotal,
  totalAll,
  setValue,
}: PurchaseOrderRowProps) => {
  return (
    <Box className="flex flex-col items-end">
      <Grid columns={{ initial: "1", md: "2" }} gap="4" justify={"end"}>
        <Box></Box>
        <Box className="flex flex-col items-end justify-end gap-3">
          <Grid columns={{ initial: "1", md: "3" }} gap="4">
            <Text className="text-right">Sub Total</Text>
            <Box></Box>
            <Input type="text" value={formatPrice(subTotal)} readOnly />
          </Grid>
          <Box className="flex">
            <Grid columns={{ initial: "1", md: "3" }} gap="4">
              <Text className="text-right">Diskon</Text>
              <Box></Box>
              <Box className="flex items-center gap-3">
                <FormField
                  control={control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setValue("discount", Number(event.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Box>
            </Grid>
          </Box>
          <Box className="flex">
            <Grid columns={{ initial: "1", md: "3" }} gap="4">
              <Text className="text-right">PPN</Text>
              <Box></Box>
              <Box className="flex items-center gap-3">
                <FormField
                  control={control}
                  name="ppn"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setValue("ppn", Number(event.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Box>
            </Grid>
          </Box>
          <Grid columns={{ initial: "1", md: "3" }} gap="4">
            <Text className="text-right">Total</Text>
            <Box></Box>
            <Input type="text" value={formatPrice(totalAll)} readOnly />
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default PurchaseFakturSummaryForm;

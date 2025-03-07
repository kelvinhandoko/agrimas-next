import { Box, Grid } from "@radix-ui/themes";
import { Trash2Icon } from "lucide-react";
import { type FC } from "react";
import { type Control, type FieldArrayWithId } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SaleOrderFormDetailProps {
  field: FieldArrayWithId<any, "details", "uid">;
  remove: () => void;
  index: number;
  control: Control<any>;
}
const SaleOrderForm: FC<SaleOrderFormDetailProps> = ({
  control,
  field,
  remove,
  index,
}) => {
  return (
    <Grid columns={{ initial: "1", md: "8" }} gap="4" className="mt-3">
      <FormField
        control={control}
        name="no_penjualan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kode Barang</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukkan kode barang"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="no_penjualan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Barang</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="no_penjualan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Qty</FormLabel>
            <FormControl>
              <Input type="number" {...field} min={0} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="no_penjualan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Harga Barang</FormLabel>
            <FormControl>
              <Input type="number" {...field} min={0} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="no_penjualan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Diskon</FormLabel>
            <FormControl>
              <Input type="number" {...field} min={0} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="no_penjualan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PPN</FormLabel>
            <FormControl>
              <Input type="number" {...field} min={0} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="no_penjualan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total</FormLabel>
            <FormControl>
              <Input type="number" {...field} min={0} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Box>
        #
        <Box>
          <Trash2Icon
            className="mt-4 cursor-pointer text-red-600"
            onClick={remove}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default SaleOrderForm;

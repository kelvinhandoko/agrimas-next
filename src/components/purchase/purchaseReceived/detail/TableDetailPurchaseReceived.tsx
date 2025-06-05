import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const purchaseReturnDetails = [
  {
    itemCode: "BRG-001",
    itemName: "Monitor 24 Inch",
    quantity: 2,
  },
  {
    itemCode: "BRG-002",
    itemName: "Keyboard Mechanical",
    quantity: 5,
  },
  {
    itemCode: "BRG-003",
    itemName: "Mouse Wireless",
    quantity: 3,
  },
  {
    itemCode: "BRG-004",
    itemName: "Laptop Stand",
    quantity: 1,
  },
  {
    itemCode: "BRG-005",
    itemName: "HDMI Cable 2m",
    quantity: 4,
  },
];

export function TableDetailPurchaseReceived() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Kode Barang</TableHead>
          <TableHead>Nama Barang</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchaseReturnDetails.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.itemCode}</TableCell>
            <TableCell>{item.itemName}</TableCell>
            <TableCell>{item.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

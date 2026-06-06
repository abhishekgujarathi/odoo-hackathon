import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    po: "PO-001",
    vendor: "Tech Corp",
    amount: "$14,000",
    status: "Pending",
  },
  {
    po: "PO-002",
    vendor: "Infra Ltd",
    amount: "$7,800",
    status: "Approved",
  },
  {
    po: "PO-003",
    vendor: "OfficeNeed",
    amount: "$3,400",
    status: "Draft",
  },
];

export function RecentOrdersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>PO#</TableHead>
          <TableHead>Vendor</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.po}>
            <TableCell>{order.po}</TableCell>
            <TableCell>{order.vendor}</TableCell>
            <TableCell>{order.amount}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
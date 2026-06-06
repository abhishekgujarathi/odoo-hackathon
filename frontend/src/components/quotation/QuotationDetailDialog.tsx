import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

type QuotationItem = {
  item: string;
  qty: number;
  unitPrice: number;
};

type Quotation = {
  id: number;
  vendor: string;
  total: number;
  gst: number;
  deliveryDays: number;
  paymentTerms: string;
  notes: string;
  items: QuotationItem[];
};

type Props = {
  quotation: Quotation;
};

export default function QuotationDetailDialog({ quotation }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Full
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{quotation.vendor}</DialogTitle>

          <DialogDescription>Full quotation details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>

                <TableHead>Quantity</TableHead>

                <TableHead>Unit Price</TableHead>

                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {quotation.items.map((item) => (
                <TableRow key={item.item}>
                  <TableCell>{item.item}</TableCell>

                  <TableCell>{item.qty}</TableCell>

                  <TableCell>₹{item.unitPrice.toLocaleString()}</TableCell>

                  <TableCell>
                    ₹{(item.qty * item.unitPrice).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Commercial Details</h3>

              <div className="space-y-2 text-sm">
                <p>GST: {quotation.gst}%</p>

                <p>Delivery: {quotation.deliveryDays} days</p>

                <p>Payment Terms: {quotation.paymentTerms}</p>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Vendor Notes</h3>

              <p className="text-sm text-muted-foreground">{quotation.notes}</p>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Grand Total</span>

              <span>₹{quotation.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

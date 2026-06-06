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

import { Eye, Package, FileText, IndianRupee } from "lucide-react";

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
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2 transition-all hover:bg-muted/50"
        >
          <Eye className="h-4 w-4" />
          View Full
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">{quotation.vendor}</DialogTitle>
              <DialogDescription>Full quotation breakdown</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">Item</TableHead>
                <TableHead className="font-semibold">Quantity</TableHead>
                <TableHead className="font-semibold">Unit Price</TableHead>
                <TableHead className="font-semibold">Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {quotation.items.map((item) => (
                <TableRow key={item.item} className="hover:bg-muted/20">
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>₹{item.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold">
                    ₹{(item.qty * item.unitPrice).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-muted/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <IndianRupee className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Commercial Details</h3>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST</span>
                  <span className="font-medium">{quotation.gst}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">
                    {quotation.deliveryDays} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Terms</span>
                  <span className="font-medium">
                    {quotation.paymentTerms}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-muted/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Vendor Notes</h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {quotation.notes}
              </p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Grand Total</span>
              <span className="text-2xl text-primary">
                ₹{quotation.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

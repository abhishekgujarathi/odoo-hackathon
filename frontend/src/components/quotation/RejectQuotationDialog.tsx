import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

type Props = {
  vendorName: string;
  onReject?: (vendorName: string, reason: string) => void;
};

export default function RejectQuotationDialog({ vendorName, onReject }: Props) {
  const [reason, setReason] = useState("");

  const [open, setOpen] = useState(false);

  const handleReject = () => {
    if (!reason.trim()) return;

    console.log("Rejected:", vendorName);

    console.log("Reason:", reason);

    onReject?.(vendorName, reason);

    setReason("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Reject
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Quotation</DialogTitle>

          <DialogDescription>
            Reject quotation from{" "}
            <span className="font-medium">{vendorName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <label className="text-sm font-medium">Rejection Reason</label>

          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter rejection reason..."
            rows={5}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={handleReject}>
            Confirm Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

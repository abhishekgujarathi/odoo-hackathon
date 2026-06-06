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

import { XCircle, AlertTriangle } from "lucide-react";

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
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <XCircle className="h-4 w-4" />
          Reject
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-destructive/10 p-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Reject Quotation</DialogTitle>
              <DialogDescription>
                Reject quotation from{" "}
                <span className="font-semibold text-foreground">
                  {vendorName}
                </span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3">
          <label className="text-sm font-medium">Rejection Reason</label>

          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please provide a detailed reason for rejection..."
            rows={5}
            className="resize-none"
          />
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="px-5"
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={!reason.trim()}
            className="px-5 gap-2"
          >
            <XCircle className="h-4 w-4" />
            Confirm Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

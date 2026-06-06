import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <div className="flex gap-3 flex-wrap">
      <Button>
        New RFQ
      </Button>

      <Button variant="outline">
        Add Vendor
      </Button>

      <Button variant="secondary">
        View Invoices
      </Button>
    </div>
  );
}
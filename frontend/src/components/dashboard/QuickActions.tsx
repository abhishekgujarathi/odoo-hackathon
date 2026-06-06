import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 flex-wrap">
      <Button onClick={() => navigate("/rfqs/create")}>
        New RFQ
      </Button>

      <Button variant="outline" onClick={() => navigate("/vendors/add")}>
        Add Vendor
      </Button>

      <Button variant="secondary">
        View Invoices
      </Button>
    </div>
  );
}
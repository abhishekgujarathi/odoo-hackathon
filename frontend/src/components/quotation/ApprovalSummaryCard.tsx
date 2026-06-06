import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { CheckCircle2, Clock, Shield } from "lucide-react";

type Props = {
  selectedVendor?: string;
};

const workflow = [
  {
    approver: "Procurement Manager",
    status: "Approved",
  },
  {
    approver: "Finance Manager",
    status: "Pending",
  },
  {
    approver: "Director",
    status: "Pending",
  },
];

export default function ApprovalSummaryCard({ selectedVendor }: Props) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg">Approval Workflow</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-lg bg-muted/30 p-4">
          <h3 className="font-medium mb-1 text-sm text-muted-foreground uppercase tracking-wider">
            Selected Vendor
          </h3>
          <p className={`text-lg font-semibold ${selectedVendor ? "text-foreground" : "text-muted-foreground"}`}>
            {selectedVendor || "No vendor selected"}
          </p>
        </div>

        <div className="space-y-3">
          {workflow.map((item, index) => (
            <div
              key={item.approver}
              className="flex items-center justify-between rounded-xl border p-4 transition-colors hover:bg-muted/20"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center rounded-full h-8 w-8 text-sm font-bold ${
                    item.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.status === "Approved" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="font-medium">{item.approver}</span>
              </div>

              <Badge
                variant={item.status === "Approved" ? "default" : "secondary"}
                className={`gap-1 ${
                  item.status === "Approved"
                    ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-100"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {item.status === "Pending" && (
                  <Clock className="h-3 w-3" />
                )}
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
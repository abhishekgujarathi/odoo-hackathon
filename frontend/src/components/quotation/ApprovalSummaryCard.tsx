import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

type Props = {
  selectedVendor?: string;
};

const workflow = [
  {
    approver:
      "Procurement Manager",
    status: "Approved",
  },

  {
    approver:
      "Finance Manager",
    status: "Pending",
  },

  {
    approver: "Director",
    status: "Pending",
  },
];

export default function ApprovalSummaryCard({
  selectedVendor,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Approval Workflow
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <h3 className="font-medium mb-1">
            Selected Vendor
          </h3>

          <p className="text-muted-foreground">
            {selectedVendor ||
              "No vendor selected"}
          </p>
        </div>

        <div className="space-y-3">
          {workflow.map(
            (item) => (
              <div
                key={
                  item.approver
                }
                className="flex items-center justify-between rounded-md border p-3"
              >
                <span>
                  {
                    item.approver
                  }
                </span>

                <Badge
                  variant={
                    item.status ===
                    "Approved"
                      ? "default"
                      : "secondary"
                  }
                >
                  {item.status}
                </Badge>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
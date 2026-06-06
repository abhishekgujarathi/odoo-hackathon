import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your procurement overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard title="Active RFQs" value="12" />
        <StatsCard title="Pending Approvals" value="5" />
        <StatsCard title="PO This Month" value="$2.3L" />
        <StatsCard title="Overdue Invoices" value="3" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Purchase Orders</CardTitle>
          </CardHeader>

          <CardContent>
            <RecentOrdersTable />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
              Chart Area
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>

        <CardContent>
          <QuickActions />
        </CardContent>
      </Card>
    </div>
  );
}
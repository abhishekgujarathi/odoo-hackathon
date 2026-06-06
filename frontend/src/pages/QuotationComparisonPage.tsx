import { useState } from "react";
import {
  FileSpreadsheet,
  Star,
  Clock,
  Truck,
  Receipt,
  CheckCircle2,
  ChevronRight,
  Inbox,
  CalendarDays,
  Hash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ApprovalSummaryCard from "@/components/quotation/ApprovalSummaryCard";
import QuotationDetailDialog from "@/components/quotation/QuotationDetailDialog";
import RejectQuotationDialog from "@/components/quotation/RejectQuotationDialog";

import {
  dummyRFQs,
  quotationsByRFQ,
  type DummyRFQ,
} from "../components/data/quotationComparisonData";

// RFQ status → badge variant map
const rfqStatusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Draft: "secondary",
  Published: "default",
  Closed: "destructive",
  UnderReview: "outline",
};

export default function QuotationComparisonPage() {
  const [selectedRFQ, setSelectedRFQ] = useState<DummyRFQ | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const handleSelectRFQ = (rfq: DummyRFQ) => {
    setSelectedRFQ(rfq);
    setSelectedVendor(null); // reset vendor selection when switching RFQs
  };

  const quotations = selectedRFQ
    ? quotationsByRFQ[selectedRFQ.id] ?? []
    : [];
  const lowestTotal =
    quotations.length > 0 ? Math.min(...quotations.map((q) => q.total)) : 0;

  return (
    <div className="w-full p-6 space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-primary/10 p-3">
            <FileSpreadsheet className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Quotation Comparison
            </h1>
            <p className="mt-1 text-base text-muted-foreground">
              Select an RFQ to compare vendor quotations and choose the best
              proposal.
            </p>
          </div>
        </div>
      </div>

      {/* ========== RFQ LIST TABLE ========== */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Receipt className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Requests for Quotation
              </CardTitle>
              <CardDescription>
                Click an RFQ to view and compare received quotations
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">RFQ Number</TableHead>
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Deadline</TableHead>
                <TableHead className="font-semibold text-center">
                  Quotations
                </TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {dummyRFQs.map((rfq) => {
                const isActive = selectedRFQ?.id === rfq.id;
                return (
                  <TableRow
                    key={rfq.id}
                    className={`cursor-pointer transition-colors ${
                      isActive
                        ? "bg-primary/5 border-l-2 border-l-primary"
                        : "hover:bg-muted/20"
                    }`}
                    onClick={() => handleSelectRFQ(rfq)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="font-mono text-sm font-medium">
                          {rfq.rfqNumber}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-xs truncate">
                      {rfq.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant={rfqStatusVariant[rfq.status] ?? "outline"}>
                        {rfq.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(rfq.deadline).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="secondary"
                        className="px-2.5 font-semibold"
                      >
                        {rfq.quotationCount}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform text-muted-foreground ${
                          isActive ? "rotate-90 text-primary" : ""
                        }`}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ========== QUOTATION COMPARISON SECTION ========== */}
      {!selectedRFQ ? (
        <Card className="shadow-sm border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">
              No RFQ Selected
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Select an RFQ from the table above to view and compare vendor
              quotations.
            </p>
          </CardContent>
        </Card>
      ) : quotations.length === 0 ? (
        <Card className="shadow-sm border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">
              No Quotations Yet
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              No vendors have submitted quotations for{" "}
              <span className="font-medium text-foreground">
                {selectedRFQ.title}
              </span>{" "}
              yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <CardHeader className="border-b pb-5">
            <div className="flex items-center gap-2 mb-1">
              <Receipt className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-lg">
                {selectedRFQ.rfqNumber}: {selectedRFQ.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground ml-6">
              {quotations.length} quotation{quotations.length !== 1 && "s"}{" "}
              received · Compare and select the best vendor
            </p>
          </CardHeader>

          <CardContent className="pt-8">
            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {quotations.map((quotation) => {
                const isLowest = quotation.total === lowestTotal;
                const isSelected = selectedVendor === quotation.vendor;

                return (
                  <Card
                    key={quotation.id}
                    className={`
                      relative overflow-hidden transition-all duration-300
                      hover:shadow-xl hover:-translate-y-1 hover:border-primary/30
                      ${isSelected ? "border-green-500 ring-2 ring-green-500/30" : ""}
                    `}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold">
                          {quotation.vendor}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-5">
                      {/* Grand Total */}
                      <div className="rounded-lg bg-muted/50 p-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                          Grand Total
                        </p>
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-3xl font-bold tracking-tight">
                            ₹{quotation.total.toLocaleString()}
                          </h3>
                          {isLowest && (
                            <Badge
                              variant="outline"
                              className="text-green-600 border-green-300 bg-green-50 text-[10px] uppercase tracking-wider"
                            >
                              Lowest
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/30">
                          <div className="rounded-md bg-blue-50 p-2">
                            <Receipt className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">GST</p>
                            <p className="font-semibold">{quotation.gst}%</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/30">
                          <div className="rounded-md bg-purple-50 p-2">
                            <Truck className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Delivery
                            </p>
                            <p className="font-semibold">
                              {quotation.deliveryDays} Days
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/30">
                          <div className="rounded-md bg-amber-50 p-2">
                            <Star className="h-4 w-4 text-amber-500" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Rating
                            </p>
                            <p className="font-semibold">{quotation.rating}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/30">
                          <div className="rounded-md bg-emerald-50 p-2">
                            <Clock className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Terms
                            </p>
                            <p className="font-semibold">
                              {quotation.paymentTerms}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2 pt-2">
                        <div className="flex gap-2">
                          <QuotationDetailDialog quotation={quotation} />
                          <RejectQuotationDialog
                            vendorName={quotation.vendor}
                          />
                        </div>

                        <Button
                          className={`w-full transition-all duration-200 font-semibold ${
                            isSelected
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : ""
                          }`}
                          onClick={() => setSelectedVendor(quotation.vendor)}
                        >
                          {isSelected ? (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Selected
                            </>
                          ) : (
                            "Select Vendor"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Selected Vendor */}
            {selectedVendor && (
              <div className="mt-8 rounded-xl border border-green-300 bg-green-50/50 p-5 flex items-center gap-3 transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-2">
                <div className="rounded-full bg-green-100 p-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">
                    Vendor Selected
                  </h3>
                  <p className="text-sm text-green-700">{selectedVendor}</p>
                </div>
              </div>
            )}

            {/* Approval Section */}
            <div className="mt-8">
              <ApprovalSummaryCard
                selectedVendor={selectedVendor || undefined}
              />
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-3 border-t pt-6">
              <Button variant="outline" className="px-6">
                Save Decision
              </Button>
              <Button className="px-6 font-semibold">
                Send For Approval
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

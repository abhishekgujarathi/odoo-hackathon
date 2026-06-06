import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Trophy,
  FileSpreadsheet,
  Star,
  Clock,
  Truck,
  Receipt,
  CheckCircle2,

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



import ApprovalSummaryCard from "@/components/quotation/ApprovalSummaryCard";

import QuotationDetailDialog from "@/components/quotation/QuotationDetailDialog";

import RejectQuotationDialog from "@/components/quotation/RejectQuotationDialog";

import { quotations } from "../components/data/quotationComparisonData.ts";

export default function QuotationComparisonPage() {
  const navigate = useNavigate();

  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const handleSelectVendor = (vendor: string) => {
    setSelectedVendor(vendor);
  };

  const lowestTotal = Math.min(...quotations.map((q) => q.total));

  return (
    <div className="w-full p-6">
      <Card className="shadow-lg">
        <CardHeader className="border-b space-y-4 pb-6">
          <Button
            type="button"
            variant="ghost"
            className="w-fit gap-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <FileSpreadsheet className="size-6 text-primary" />
            </div>

            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Quotation Comparison
              </CardTitle>

              <CardDescription className="mt-1 text-base">
                Compare vendor quotations and select the best proposal for your
                procurement needs.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          {/* Header Summary */}
          <div className="mb-8 rounded-xl border bg-muted/30 p-5">
            <div className="flex items-center gap-2 mb-1">
              <Receipt className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-lg">
                RFQ: Office Furniture Procurement Q2
              </h3>
            </div>

            <p className="text-sm text-muted-foreground ml-6">
              {quotations.length} quotations received · Compare and select the
              best vendor
            </p>
          </div>

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
                          onClick={() => handleSelectVendor(quotation.vendor)}
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
            <ApprovalSummaryCard selectedVendor={selectedVendor || undefined} />
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-end gap-3 border-t pt-6">
            <Button variant="outline" className="px-6">
              Save Decision
            </Button>

            <Button className="px-6 font-semibold">Send For Approval</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
